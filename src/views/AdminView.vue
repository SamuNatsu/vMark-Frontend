<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

// Stores
import { useI18NStore } from "../stores/I18N";
import { useSkinStore } from "../stores/Skin";

// Components
import Topbar from '../components/Topbar.vue';
import Footer from "../components/Footer.vue";
import axios from "axios";

// Router
const route = useRoute();
const router = useRouter();

// I18N store
const i18n = useI18NStore();
await i18n.init();

// Skin store
const skin = useSkinStore();
await skin.init();
const { title } = storeToRefs(skin);

// Set title
document.querySelector("title").innerHTML = title.value.admin || "vMark Admin Page";

// Menu select
const current = ref(route.query.m || 0);
const menuSelect = (next)=>{
    current.value = next;
    router.push({query: {m: next}});
};
const backSelect = ()=>router.push({name: "index"});

// User manage
const userSearchBox = ref("");
const userCount = ref(0);
const userList = ref([]);
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
};
const userSearch = async ()=>{
    let ret = (await axios.get(vMarkBackendAPI + "api/user/?account=" + userSearchBox.value)).data;
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
userRefresh();
</script>

<template>
    <Topbar/>

    <div class="admin__frame">
        <div class="admin__menu">
            <div :class="{'admin__menu--current': current == 0}" @click="menuSelect(0)">
                {{ i18n.getLang("admin.menu.dashboard") }}
            </div>
            <div :class="{'admin__menu--current': current == 1}" @click="menuSelect(1)">
                {{ i18n.getLang("admin.menu.user") }}
            </div>
            <div :class="{'admin__menu--current': current == 2}" @click="menuSelect(2)">
                {{ i18n.getLang("admin.menu.item") }}
            </div>
            <div :class="{'admin__menu--current': current == 3}" @click="menuSelect(3)">
                {{ i18n.getLang("admin.menu.order") }}
            </div>
            <div :class="{'admin__menu--current': current == 4}" @click="menuSelect(4)">
                {{ i18n.getLang("admin.menu.attachment") }}
            </div>
            <div :class="{'admin__menu--current': current == 5}" @click="menuSelect(5)">
                {{ i18n.getLang("admin.menu.option") }}
            </div>
            <div @click="backSelect()">{{ i18n.getLang("admin.menu.back") }}</div>
        </div>

        <div class="admin__main">
            <div v-if="current == 0">
                <h1>{{ i18n.getLang("admin.menu.dashboard") }}</h1>
                <hr/>
            </div>

            <div v-if="current == 1">
                <h1>{{ i18n.getLang("admin.menu.user") }}</h1>
                <hr/>
                <div class="admin__user__opbar">
                    <div @click="userRefresh()">{{ i18n.getLang("admin.main.user.refresh") }}</div>
                    <input type="text" v-model="userSearchBox"/>
                    <div @click="userSearch()">{{ i18n.getLang("admin.main.user.search") }}</div>
                </div>
                <table class="admin__user__list">
                    <tr>
                        <th>uid</th>
                        <th>{{ i18n.getLang("admin.main.user.account") }}</th>
                        <th>{{ i18n.getLang("admin.main.user.name") }}</th>
                        <th>{{ i18n.getLang("admin.main.user.op") }}</th>
                    </tr>
                    <tr v-for="i in userList" class="admin__user__list__item">
                        <td>{{ i.uid }}</td>
                        <td :class="[{'admin__user__list__item--super': i.privilege === 2}, {'admin__user__list__item--admin': i.privilege === 1}]">{{ i.account }}</td>
                        <td :class="[{'admin__user__list__item--super': i.privilege === 2}, {'admin__user__list__item--admin': i.privilege === 1}]">{{ i.name ?? i18n.getLang("admin.main.user.default_name") }}</td>
                        <td class="admin__user__list__opbar">
                            <a href="#" @click="userRename(i.uid)">{{ i18n.getLang("admin.main.user.rename") }}</a>
                            <a href="#" @click="resetPassword(i.uid)">{{ i18n.getLang("admin.main.user.reset_password") }}</a>
                            <a href="#">{{ i18n.getLang("admin.main.user.permit") }}</a>
                            <a href="#" @click="userDelete(i.uid)">{{ i18n.getLang("admin.main.user.delete") }}</a>
                        </td>
                    </tr>
                </table>
                <div>{{ i18n.getLang("admin.main.user.total").format(userCount, Math.trunc(userCount / 20) + ((userCount % 20) ? 1 : 0)) }}</div>
            </div>

            <div v-if="(current == 2)">
                <h1>{{ i18n.getLang("admin.menu.item") }}</h1>
                <hr/>
            </div>

            <div v-if="(current == 3)">
                <h1>{{ i18n.getLang("admin.menu.order") }}</h1>
                <hr/>
            </div>

            <div v-if="(current == 4)">
                <h1>{{ i18n.getLang("admin.menu.attachment") }}</h1>
                <hr/>
            </div>

            <div v-if="(current == 5)">
                <h1>{{ i18n.getLang("admin.menu.option") }}</h1>
                <hr/>
            </div>
        </div>
    </div>

    <Footer/>

</template>

<style scoped>
    hr {
        border: 0;
        border-bottom: 2px dashed gray;
    }

    .admin__frame {
        display: flex;
        min-height: 800px;
    }

    .admin__menu {
        background: #333;
        padding: 50px 30px;
        width: 15%;
    }
    .admin__menu>div {
        background: #333;
        border-radius: 20px;
        color: #fff;
        cursor: pointer;
        margin: 20px 5px;
        padding: 10px 20px;
        text-align: center;
        transition: background .2s, color .2s;
    }
    .admin__menu>div:hover {
        background: #fff;
        color: #000;
    }

    .admin__menu--current {
        background: #fff !important;
        color: #000 !important;
        font-weight: bold !important;
    }

    .admin__main {
        background: #fff;
        border-radius: 20px;
        box-shadow: lightgray 1px 1px 5px;
        margin: 20px;
        padding: 20px;
        width: 85%;
    }

    .admin__user__opbar {
        display: flex;
        margin: 30px 0;
    }
    .admin__user__opbar>div {
        background: #333;
        border: 2px solid #333;
        color: #fff;
        cursor: pointer;
        margin: 0 10px;
        padding: 5px;
        transition: background .2s, color .2s;
    }
    .admin__user__opbar>div:hover {
        background: 0;
        color: #000;
    }
    .admin__user__opbar>input {
        margin-left: 40px;
    }

    .admin__user__list {
        border-collapse: collapse;
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        margin-bottom: 10px;
        width: 100%;
    }
    .admin__user__list td, .admin__user__list th {
        min-width: 100px;
        padding: 5px 10px;
        text-align: center;
    }
    .admin__user__list th {
        border-bottom: 2px solid black;
    }
    .admin__user__list td {
        border-bottom: 1px dashed lightgray;
    }

    .admin__user__list__item--super {
        color: red;
        font-weight: bold;
    }
    .admin__user__list__item--admin {
        color: orange;
    }

    .admin__user__list__opbar>a {
        color: royalblue;
        margin: 0 10px;
        text-decoration: none;
    }
    .admin__user__list__opbar>a:hover {
        color: #e00;
    }

</style>
