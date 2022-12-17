<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import stores from "../pinia";

// Components
import Topbar from '../components/Topbar.vue';
import Footer from "../components/Footer.vue";
import AdminUser from "./admin/AdminUser.vue";
import AdminAttachment from "./admin/AdminAttachment.vue"
import AdminItem from "./admin/AdminItem.vue";
import AdminOption from "./admin/AdminOption.vue";
import AdminOrder from "./admin/AdminOrder.vue";

// Router
const route = useRoute();
const router = useRouter();

// I18N store
const i18n = stores.i18n;

// Set title
document.querySelector("title").innerHTML = "vMark Admin Page";

// Menu select
const current = ref(route.query.m || 1);
const menuSelect = (next)=>{
    current.value = next;
    router.push({query: {m: next}});
};
const backSelect = ()=>router.push({name: "index"});

</script>

<template>
    <Topbar/>

    <!-- Admin page frame -->
    <div class="admin__frame">
        <!-- Side menu bar -->
        <div class="admin__menu">
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

            <div @click="backSelect()">
                {{ i18n.getLang("admin.menu.back") }}
            </div>
        </div>

        <!-- Main frame -->
        <div class="admin__main">
            <!-- User manage -->
            <AdminUser v-if="current == 1"/>

            <AdminItem v-if="current == 2"/>

            <AdminOrder v-if="(current == 3)"/>

            <!-- Attachment manage -->
            <AdminAttachment v-if="current == 4"/>

            <AdminOption v-if="current == 5"/>
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
</style>
