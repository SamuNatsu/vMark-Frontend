import { defineStore } from "pinia";
import { ajaxGet } from "../modules/ajax.js";
import { localStorageGet, localStorageSet } from "../modules/localStorage.js";

// Match language
const matchLang = (index, key)=>{
	let prefix = key.indexOf("_");
	if (prefix !== -1)
		return index.find((value)=>value === key);
	prefix = key.substr(0, prefix);
	return index.find((value)=>value === key) || index.find((value)=>value === prefix);
};

// Get index
let index = JSON.parse(await ajaxGet(window.location.protocol + "/i18n/index.json"));

// Get browser current language
let current = (localStorageGet("i18n").current || navigator.systemLanguage || navigator.language).replace("-", "_");
current = (matchLang(Object.keys(index), current) ?? "en_US");

// Get language JSON
let lang = JSON.parse(await ajaxGet(window.location.protocol + "/i18n/" + current + ".json"));
localStorageSet("i18n", {current});

// Initialize cache
let cache = {};
cache[current] = lang;

// Export store
export const useI18N = defineStore("i18n", {
	state: ()=>({
		index,
		current,
		lang,
		cache
	}),
	getters: {
		getLanguageName() {
			return this.index[this.current];
		}
	},
	actions: {
		matchLang,
		updateLocalStorage() {
			localStorageSet("i18n", {current: this.current});
		},
		async switchLang(key) {
			// Find in index
			this.current = this.matchLang(Object.keys(this.index), key);
			if (this.current === undefined)
				this.current = "en_US";

			// Find in cache
			if (this.cache[this.current] !== undefined) {
				this.lang = this.cache[this.current];
				this.updateLocalStorage();
				return;
			}

			// Find in remote
			this.lang = JSON.parse(await ajaxGet(window.location.protocol + "/i18n/" + this.current + ".json"));
			this.cache[this.current] = this.lang;
			this.updateLocalStorage();
		}
	}
});
