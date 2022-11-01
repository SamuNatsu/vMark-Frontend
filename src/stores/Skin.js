import { defineStore } from "pinia";

// Export store
export const useSkinStore = defineStore("skin", {
    state: ()=>({
		title: {},
        header: {}
    }),
	actions: {
		init: async function() {}
	}
});
