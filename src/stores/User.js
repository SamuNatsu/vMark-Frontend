import { defineStore } from "pinia";

// Export store
export const useUserStore = defineStore("user", {
    state: ()=>({
        login: false,
        admin: false,
        account: ""
    }),
    actions: {
        init: async function() {}
    }
});
