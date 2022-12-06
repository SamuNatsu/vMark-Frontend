import axios from "axios";
import { defineStore } from "pinia";

// Export store
export const useSkinStore = defineStore("skin", {
    state: ()=>({
		title: {},
        header: {},
		topAd: '<div style="background:repeating-linear-gradient(-45deg,#f74545,#f74545 8px,#ffffff 8px,#ffffff 40px);height:100%;width:100%"></div>'
    }),
	actions: {
		init: async function() {
			let ret = (await axios.get(vMarkBackendAPI + "api/option/get/skin")).data;
			
		}
	}
});
