import { defineStore } from "pinia";
import { ajaxGet } from "../modules/ajax.js";

// Export store
export const useUserStore = defineStore("user", {
    state: ()=>({
        login: false,
        account: ""
    })
});
