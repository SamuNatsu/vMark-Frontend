import { defineStore } from "pinia";
import { ajaxGet } from "../modules/ajax.js";

// Export store
export const useUser = defineStore("user", {
    state: ()=>({
        login: false,
        account: ""
    })
});
