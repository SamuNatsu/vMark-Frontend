import { defineStore } from "pinia";

import { ajaxGet } from "../modules/ajax.js";
import { localStorageGet, localStorageSet } from "../modules/localStorage.js";

// Export store
export const useI18NStore = defineStore("i18n", {
	state: ()=>({
		index: null,
		current: null,
		lang: null,
		cache: []
	}),
	getters: {
		getCurrentName: (state)=> {
			return state.index === null || state.current === null ? 
				"" : (state.index[state.current] ?? "");
		},
		getLanguageNames: (state)=>{
			return state.index === null ? [] : Object.values(state.index);
		},
		getLang: (state)=>((key)=>{
			if (state.lang === null)
				return key;

			let lang = state.lang;
			let list = key.split(".");
			for (let i = 0; i < list.length; ++i) 
				if (lang[list[i]] === undefined)
					return key;
				else if ((typeof lang[list[i]]) === "object")
					lang = lang[list[i]];
				else if ((typeof lang[list[i]]) === "string") {
					if (i + 1 === list.length)
						return lang[list[i]];
					else 
						return key;
				}

			return key;
		})
	},
	actions: {
		updateLocal: function() {
			localStorageSet("i18n", {current: this.current});
		},
		matchLang: function(key) {
			let prefix = key.indexOf("_");
			let list = Object.keys(this.index);
			if (prefix === -1)
				return list.find((value)=>value === key);

			prefix = key.substr(0, prefix);
			return list.find((value)=>value === key) || list.find((value)=>value === prefix);
		},
		init: async function() {
			if (this.index !== null)
				return;

			this.index = JSON.parse(await ajaxGet("/i18n/index.json"));
			this.current = (localStorageGet("i18n").current || navigator.systemLanguage || navigator.language).replace("-", "_");
			this.current = (this.matchLang(this.current) ?? "en_US");
			this.lang = JSON.parse(await ajaxGet(`/i18n/${this.current}.json`));
			this.cache[this.current] = this.lang;

			this.updateLocal();
		},
		switchLang: async function(key) {
			this.current = (this.matchLang(key) ?? "en_US");

			if (this.cache[this.current] !== undefined)
				this.lang = this.cache[this.current];
			else {
				this.lang = JSON.parse(await ajaxGet(`/i18n/${this.current}.json`));
				this.cache[this.current] = this.lang;
			}

			this.updateLocal();
		}
	}
});
