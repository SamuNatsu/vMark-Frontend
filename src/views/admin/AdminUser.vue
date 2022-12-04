<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useI18NStore } from '../../stores/I18N';
import { useUserStore } from '../../stores/User';

import Captcha from '../../components/Captcha.vue';

const i18n = useI18NStore();
await i18n.init();

const user = useUserStore();
await user.init();

const userSearchBox = ref("");
const userCount = ref(0);
const userList = ref([]);
const userPage = ref(1);
const jumpToPage = ref(1);
const regAccount = ref("");
const regPass = ref("");
const regCaptcha = ref("");

const userRefresh = async ()=>{
    let ret = (await axios.get(vMarkBackendAPI + "api/user/")).data;
    if (ret.status === "failed") {
        alert(i18n.getLang(ret.message));
        return;
    }
    userList.value = ret.data;

    ret = (await axios.get(vMarkBackendAPI + "api/user/count")).data;
    if (ret.status === "failed") {
        alert(i18n.getLang(ret.message));
        return;
    }
    userCount.value = ret.data;

    userSearchBox.value = "";
    userPage.value = 1;
};

const userSearch = async ()=>{
    if (userSearchBox.value.length === 0) {
        alert(i18n.getLang("admin.main.user.message.search.empty"));
        return;
    }

    userList.value = [];
    userCount.value = 0;
    let ret = (await axios.get(vMarkBackendAPI + "api/user/?s=" + userSearchBox.value + "&p=" + userPage.value)).data;
    if (ret.status === "failed") {
        alert(i18n.getLang(ret.message));
        return;
    }
    userList.value = ret.data;
    userCount.value = ret.data.length;
};

const userRename = async (uid)=>{
    let inp = prompt(i18n.getLang("admin.main.user.message.rename.prompt"));
    if (inp.length > 30) {
        alert(i18n.getLang("message.invalid.new_name"));
        return;
    }

    let ret = (await axios.post(
            vMarkBackendAPI + "api/user/update/info",
            {uid, new_name: inp},
            {headers: {"Content-Type": "application/x-www-form-urlencoded"}})).data;
    if (ret.status === "success")
        alert(i18n.getLang("admin.main.user.message.rename.success"));
    else
        alert(ret.message);
    userRefresh();
};

const setPrivilege = async (uid)=>{
    let inp = prompt(i18n.getLang("admin.main.user.message.set_privilege.prompt"));
    if (inp !== "0" && inp !== "1") {
        alert(i18n.getLang("admin.main.user.message.set_privilege.invalid"));
        return;
    }

    let ret = (await axios.post(
            vMarkBackendAPI + "api/user/update/privilege",
            {uid, privilege: inp},
            {headers: {"Content-Type": "application/x-www-form-urlencoded"}})).data;
    if (ret.status === "success")
        alert(i18n.getLang("admin.main.user.message.set_privilege.success"));
    else
        alert(ret.message);
    userRefresh();
};

const resetPassword = async (uid)=>{
    if (confirm(i18n.getLang("admin.main.user.message.reset_password.confirm").format(uid))) {
        let ret = (await axios.post(
            vMarkBackendAPI + "api/user/update/info",
            {uid, new_password: CryptoJS.SHA256("123456").toString()},
            {headers: {"Content-Type": "application/x-www-form-urlencoded"}})).data;
        if (ret.status === "success")
            alert(i18n.getLang("admin.main.user.message.reset_password.success"));
        else
            alert(ret.message);
        userRefresh();
    }
};

const userDelete = async (uid)=>{
    if (confirm(i18n.getLang("admin.main.user.message.delete.confirm").format(uid))) {
        let ret = (await axios.post(
            vMarkBackendAPI + "api/user/delete",
            {uid},
            {headers: {"Content-Type": "application/x-www-form-urlencoded"}})).data;
        if (ret.status === "success")
            alert(i18n.getLang("admin.main.user.message.delete.success"));
        else
            alert(ret.message);
        userRefresh();
    }
};

const register = async ()=>{
    if (!/^[0-9a-zA-Z_]{6,30}$/.test(regAccount.value)) {
        alert(i18n.getLang("message.invalid.account"));
        return;
    }
    if (!/^[0-9a-zA-Z._~!@#$^&*]{6,}$/.test(regPass.value)) {
        alert(i18n.getLang("message.invalid.password"));
        return;
    }
    if (!/^[0-9A-Z]{4}$/.test(regCaptcha.value.toUpperCase())) {
        alert(i18n.getLang("message.invalid.captcha"));
        return;
    }
    let pass = CryptoJS.SHA256(regPass.value).toString();
    let capt = regCaptcha.value.toUpperCase();

    let ret = (await axios.post(
        vMarkBackendAPI + "api/user/register",
        {
            account: regAccount.value, 
            password: pass, 
            captcha: capt
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })).data;
    if (ret.status === "failed") {
        alert(i18n.getLang(ret.message));
        return;
    }
    alert(i18n.getLang("admin.main.user.message.register.success"));
    userRefresh();
};

const jumpPage = async ()=>{
    userPage.value = jumpToPage.value;

    userList.value = [];
    userCount.value = 0;
    let ret = (await axios.get(vMarkBackendAPI + "api/user/?s=" + userSearchBox.value + "&p=" + userPage.value)).data;
    if (ret.status === "failed") {
        alert(i18n.getLang(ret.message));
        return;
    }
    userList.value = ret.data;
    userCount.value = ret.data.length;
};

userRefresh();
</script>

<template>
    <div class="wrapper">
        <!-- Title -->
        <h1>{{ i18n.getLang("admin.menu.user") }}</h1>
        <hr/>

        <!-- User list -->
        <h2>{{ i18n.getLang("admin.main.user.list.title") }}</h2>
        <div class="list__opbar">
            <div @click="userRefresh()">
                {{ i18n.getLang("admin.main.user.list.refresh") }}
            </div>
            <span></span>
            <input type="text" :placeholder="i18n.getLang('admin.main.user.list.search_box')" v-model="userSearchBox"/>
            <div @click="userSearch()">
                {{ i18n.getLang("admin.main.user.list.search") }}
            </div>
        </div>
        <table class="list__body">
            <tr>
                <th>uid</th>
                <th>{{ i18n.getLang("admin.main.user.list.account") }}</th>
                <th>{{ i18n.getLang("admin.main.user.list.name") }}</th>
                <th>{{ i18n.getLang("admin.main.user.list.op") }}</th>
            </tr>
            <tr v-for="i in userList" class="list__item">
                <td>{{ i.uid }}</td>
                <td :class="[{'list__item--super': i.privilege === 2}, {'list__item--admin': i.privilege === 1}]">
                    {{ i.account }}
                </td>
                <td :class="[{'list__item--super': i.privilege === 2}, {'list__item--admin': i.privilege === 1}]">
                    {{ i.name ?? i18n.getLang("admin.main.user.list.default_name") }}
                </td>
                <td class="list__item__opbar">
                    <a href="#" @click="userRename(i.uid)">
                        {{ i18n.getLang("admin.main.user.list.rename") }}
                    </a>
                    <a href="#" @click="resetPassword(i.uid)">
                        {{ i18n.getLang("admin.main.user.list.reset_password") }}
                    </a>
                    <a href="#" v-if="user.getPrivilege == 2" @click="setPrivilege(i.uid)">
                        {{ i18n.getLang("admin.main.user.list.permit") }}
                    </a>
                    <a href="#" @click="userDelete(i.uid)">
                        {{ i18n.getLang("admin.main.user.list.delete") }}
                    </a>
                </td>
            </tr>
        </table>
        <div>
            {{ i18n
                .getLang("admin.main.user.list.total")
                .format(userCount, Math.trunc(userCount / 20) + ((userCount % 20) ? 1 : 0), userPage) 
            }}
        </div>
        <div>
            {{ i18n.getLang("admin.main.user.list.jump") }}
            <input type="text" style="margin: 5px;width: 50px" v-model="jumpToPage"/>
            {{ i18n.getLang("admin.main.user.list.page") }}
            <button @click="jumpPage()">{{ i18n.getLang("admin.main.user.list.to") }}</button>
        </div>
        <hr/>

        <!-- Register user -->
        <h2>{{ i18n.getLang("admin.main.user.register.title") }}</h2>
        <div class="register">
            <table>
                <tr>
                    <td>{{ i18n.getLang("admin.main.user.register.account") }}</td>
                    <td><input type="text" v-model="regAccount"/></td>
                </tr>
                <tr>
                    <td>{{ i18n.getLang("admin.main.user.register.password") }}</td>
                    <td><input type="password" v-model="regPass"/></td>
                </tr>
                <tr>
                    <td>{{ i18n.getLang("admin.main.user.register.captcha") }}</td>
                    <td><input type="text" v-model="regCaptcha"/></td>
                </tr>
            </table>
            <Captcha/>
            <button @click="register()">{{ i18n.getLang("admin.main.user.register.submit") }}</button>
        </div>
    </div>
</template>

<style scoped>
    hr {
        border: 0;
        border-bottom: 2px dashed gray;
    }

    .list__opbar {
        display: flex;
        margin: 20px 0;
    }
    .list__opbar>div {
        background: #333;
        border: 2px solid #333;
        color: #fff;
        cursor: pointer;
        margin: 0 10px;
        padding: 5px;
        transition: background .2s, color .2s;
    }
    .list__opbar>div:hover {
        background: 0;
        color: #000;
    }
    .list__opbar>span {
        border-left: 1px solid gray;
        margin: 0 20px;
    }
    .list__opbar>input {
        margin: 0 10px;
    }

    .list__body {
        border-collapse: collapse;
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        margin-bottom: 10px;
        width: 100%;
    }
    .list__body td, .list__body th {
        min-width: 100px;
        padding: 5px 10px;
        text-align: center;
    }
    .list__body th {
        border-bottom: 2px solid black;
    }
    .list__body td {
        border-bottom: 1px dashed lightgray;
    }

    .list__item--super {
        color: red;
        font-weight: bold;
    }
    .list__item--admin {
        color: orange;
    }

    .list__item__opbar>a {
        color: royalblue;
        margin: 0 10px;
        text-decoration: none;
    }
    .list__item__opbar>a:hover {
        color: #e00;
    }

    .register {
        align-items: center;
        display: flex;
        flex-direction: column;
        width: fit-content;
    }
    .register>* {
        margin-bottom: 10px;
    }
    .register>table td {
        padding: 5px;
    }
</style>
