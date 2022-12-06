import { defineStore } from "pinia";
import axios from "axios";
import stores from "."

// Export store
export const useUserStore = defineStore("user", {
    state: ()=>({
        initialized: false,
        user: null
    }),
    getters: {
        isLogined: (state)=>state.user != null,
        isAdmin: (state)=>state.user === null ? false : state.user.privilege > 0,
        getAccount: (state)=>state.user === null ? "" : state.user.account,
        getName: (state)=>state.user === null ? null : state.user.name,
        getUid: (state)=>state.user === null ? 0 : state.user.uid,
        getPrivilege: (state)=>state.user === null ? 0 : state.user.privilege
    },
    actions: {
        init: async function() {
            if (this.initialized)
                return;

            let info = (await axios.get(vMarkBackendAPI + "api/auth/info")).data;
            if (info.status === "success")
                this.user = info.data;
            this.initialized = true;
        },
        login: async function(account, password, captcha, message, router) {
            if (this.user !== null) {
                message.value = "message.auth.already_login";
                return;
            }

            let result = (await axios.post(
                vMarkBackendAPI + "api/auth/login", 
                {account, password, captcha}, 
                {headers: {"Content-Type": "application/x-www-form-urlencoded"}})).data;

            if (result.status === "failed") {
                message.value = result.message;
                return;
            }
            this.user = result.data;
            router.push({name: "index"});
        },
        logout: async function() {
            await axios.post(vMarkBackendAPI + "api/auth/logout");
            this.user = null;
        },
        reg: async function(account, password, captcha, message, router) {
            console.log(account)
            console.log(password)
            console.log(captcha)
            let ret = (await axios.post(
                vMarkBackendAPI + "api/user/register", 
                {account, password, captcha}, 
                {headers: {"Content-Type": "application/x-www-form-urlencoded"}})).data;

            if (ret.status === "failed") {
                message.value = ret.message;
                return;
            }
            alert(stores.i18n.getLang("register.success"));
            router.push({name: "login"})
        }
    }
});
