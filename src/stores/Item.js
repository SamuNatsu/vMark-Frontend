import { defineStore } from "pinia";
import { ajaxGet } from "../modules/ajax.js";

// Export store
export const useItemStore = defineStore("item", {
    state: ()=>({
		category: [
			{
				name: "Cate 1",
				cid: 1
			},
			{
				name: "Cate 2",
				cid: 2
			},
			{
				name: "Cate 3",
				cid: 3
			}
		]
    }),
	getters: {
		getCategoryLink: (state)=>((cid)=>`/search?category=${cid}`)
	},
	actions: {
		init: async ()=>{}
	}
});
