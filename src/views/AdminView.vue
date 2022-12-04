<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

// Stores
import { useI18NStore } from "../pinia/I18N";
import { useSkinStore } from "../pinia/Skin";

// Components
import Topbar from '../components/Topbar.vue';
import Footer from "../components/Footer.vue";
import axios from "axios";
import AdminUser from "./admin/AdminUser.vue";

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

</script>

<template>
    <Topbar/>

    <!-- Admin page frame -->
    <div class="admin__frame">
        <!-- Side menu bar -->
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

            <div @click="backSelect()">
                {{ i18n.getLang("admin.menu.back") }}
            </div>
        </div>

        <!-- Main frame -->
        <div class="admin__main">
            <!-- Dashboard -->
            <div v-if="current == 0">
                <h1>{{ i18n.getLang("admin.menu.dashboard") }}</h1>
                <hr/>
                <h2>{{ i18n.getLang("admin.main.dashboard.title.statistic") }}</h2>
            </div>

            <!-- User manage -->
            <AdminUser v-if="current == 1"/>

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
</style>
