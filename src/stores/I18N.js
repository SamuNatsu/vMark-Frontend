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

// Export store
export const useI18NStore = defineStore("i18n", {
	state: ()=>({
		index: null,
		current: null,
		lang: {},
		cache: []
	}),
	getters: {
		getCurrentName: (state)=> {
			try {
				return state.index[state.current];
			}
			catch (e) {
				return "";
			}
		},
		getLanguageNames: (state)=>{
			try {
				return Object.values(state.index);
			}
			catch (e) {
				return [];
			}
		},
		getLang: (state)=>((key)=>{
			let rtn = state.lang;
			let ls = key.split(".");

			for (let i = 0; i < ls.length; ++i) 
				if (rtn[ls[i]] === undefined)
					return key;
				else if ((typeof rtn[ls[i]]) === "object")
					rtn = rtn[ls[i]];
				else if ((typeof rtn[ls[i]]) === "string") {
					if (i + 1 === ls.length)
						return rtn[ls[i]];
					else 
						return key;
				}

			return key;
		})
	},
	actions: {
		updateLocalStorage: function() {
			localStorageSet("i18n", {current: this.current});
		},
		init: async function() {
			if (this.index !== null)
				return;

			this.index = JSON.parse(await ajaxGet(`/i18n/index.json`));

			this.current = (localStorageGet("i18n").current || navigator.systemLanguage || navigator.language).replace("-", "_");
			this.current = (matchLang(Object.keys(this.index), this.current) ?? "en_US");
			this.updateLocalStorage();

			this.lang = JSON.parse(await ajaxGet(`/i18n/${this.current}.json`));

			this.cache[this.current] = this.lang;
		},
		switchLang: async function(key) {
			// Find in index
			this.current = matchLang(Object.keys(this.index), key);
			if (this.current === undefined)
				this.current = "en_US";
			this.updateLocalStorage();

			// Find in cache
			if (this.cache[this.current] !== undefined) {
				this.lang = this.cache[this.current];
				return;
			}

			// Find in remote
			this.lang = JSON.parse(await ajaxGet(`/i18n/${this.current}.json`));
			this.cache[this.current] = this.lang;
		}
	}
});
