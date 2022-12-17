import axios from "axios";
import { defineStore } from "pinia";

// Export store
export const useSkinStore = defineStore("skin", {
    state: ()=>({
		sitename: undefined,
		headerMainStyle: undefined,
		headerTitleInnerHtml: undefined,
		headerTitleStyle: undefined,
		background: undefined,
		topAd: '<div style="background:repeating-linear-gradient(-45deg,#f74545,#f74545 8px,#ffffff 8px,#ffffff 40px);height:100%;width:100%"></div>'
    }),
	actions: {
		init: async function() {
			let ret = (await axios.get(vMarkBackendAPI + "api/option/get/skin")).data;
			if (ret.status === "failed" || ret.data === undefined)
				return
			Object.keys(ret.data).forEach((v)=>{
				this[v] = ret.data[v]
			})

			if (this.background !== undefined) {
				let el = document.querySelector("#background")
				el.style.position = "fixed"
				el.style.width = "100%"
				el.style.height = "100%"
				el.style.zIndex = "-1"
				el.style.backgroundImage = "url('" + this.background + "')"
			}
		}
	}
});
