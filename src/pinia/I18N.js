import { defineStore } from "pinia";
import axios from "axios";

import lStorage from "../modules/lStorage";

// Export store
export const useI18NStore = defineStore("i18n", {
	// States
	state: ()=>({
		index: null,				// Language index <Object: (Launguage code) => (Language name)>
		current: null,				// Current language code <String>
		lang: null,					// Language dictionary <Object>
		cache: []					// Language dictionary cache <Array: Object>
	}),
	// Getters
	getters: {
		// Get language index keys
		getIndexKeys: (state)=>Object.keys(state.index || {}),
		// Get language index values
		getIndexValues: (state)=>Object.values(state.index || {}),
		// Get current language name
		getCurrentName: (state)=>(state.index || {})[state.current || ""] || "",
		// Get language
		getLang: (state)=>((key)=>{
			// Check language dictionary
			if (state.lang === null)
				return key;

			let lang = state.lang;
			let list = key.split(".");

			// Go through keys
			for (let i = 0; i < list.length; ++i) 
				// Key not exists
				if (lang[list[i]] === undefined)
					return key;
				// Key matched
				else if ((typeof lang[list[i]]) === "object")
					lang = lang[list[i]];
				// Reached leaf
				else if ((typeof lang[list[i]]) === "string")
					return i + 1 == list.length ? lang[list[i]] : key;

			// Default
			return key;
		})
	},
	// Actions
	actions: {
		// Initialize
		init: async function() {
			// Check index
			if (this.index !== null)
				return;
			this.index = {};

			// Fetch I18N
			this.index = (await axios.get("/i18n/index.json")).data;
			this.current = (lStorage.get("i18n").current || navigator.systemLanguage || navigator.language).replace("-", "_");
			this.current = (this.matchLang(this.current) || "en_US");
			this.lang = (await axios.get(`/i18n/${this.current}.json`)).data;
			this.cache[this.current] = this.lang;

			// Update local storage
			this.updateLocal();
		},
		// Update local storage
		updateLocal: function() {
			lStorage.set("i18n", {current: this.current});
		},
		// Match language code
		matchLang: function(key) {
			let prefix = key.indexOf("_");
			let list = Object.keys(this.index);

			// No prefix
			if (prefix === -1)
				return list.find((value)=>value === key);

			// Has prefix
			prefix = key.substr(0, prefix);
			return list.find((value)=>value === key) || list.find((value)=>value === prefix);
		},
		// Switch language
		switchLang: async function(key) {
			// Match language
			this.current = (this.matchLang(key) || "en_US");

			// Switch language dictionary
			if (this.cache[this.current] !== undefined)
				this.lang = this.cache[this.current];
			else {
				this.lang = (await axios.get(`/i18n/${this.current}.json`)).data;
				this.cache[this.current] = this.lang;
			}

			// Update local storage
			this.updateLocal();
		}
	}
});
