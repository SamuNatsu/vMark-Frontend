import { defineStore } from "pinia";
import { ajaxGet } from "../modules/ajax.js";

// Export store
export const useSkinStore = defineStore("skin", {
    state: ()=>({
		title: {},
        header: {}
    }),
	actions: {
		init: async ()=>{}
	}
});
