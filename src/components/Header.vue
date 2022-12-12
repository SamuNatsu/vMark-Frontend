<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

import stores from "../pinia";

const route = useRoute()
const router = useRouter();

const i18n = stores.i18n;
const skin = stores.skin;

const { headerMainStyle, headerTitleInnerHtml, headerTitleStyle } = storeToRefs(skin);

const titleClick = ()=>router.push({name: "index"})

const searchText = ref(route.query.s || "");
const searchClick = ()=>router.push({
    name: "search",
    query: {s: searchText.value}
});

const defaultStyle = "font-size: 4em; font-weight: bold";
const defaultInnerHtml = '<span style="color:red">v</span><span>Mark</span>';
</script>

<template>
    <!-- Header -->
    <div class="header" :style="headerMainStyle">
        <!-- Title -->
        <div 
            v-html="headerTitleInnerHtml || defaultInnerHtml"
            class="header__title"
            :style="headerTitleStyle || defaultStyle" 
            @click="titleClick"
        />
        <!-- Search box -->
        <div class="header__searchbox">
            <!-- Search input -->
            <input 
                v-model="searchText"
                class="header__searchbox__input" 
                type="text" 
                :placeholder="i18n.getLang('header.searchbox.input')"
            />
            <!-- Search button -->
            <button 
                class="header__searchbox__button" 
                :title="i18n.getLang('header.searchbox.button')"
                @click="searchClick"
            >
                <img 
                    class="header__searchbox__button__img" 
                    src="/svg/search.svg"
                />
            </button>
        </div>
    </div>
    <!-- Divide bar -->
    <div class="divbar"></div>
</template>

<style scoped>
    .header {
        align-items: center;
        background: white;
        display: flex;
        height: 150px;
        justify-content: space-between;
        padding: 0 10%;
        width: 100%;
    }

    .header__title {
        cursor: pointer;
    }
    .header__searchbox {
        display: flex;
        width: 40%;
        height: 30%;
    }

    .header__searchbox__input {
        border: 2px solid lightgray;
        border-right: none;
        outline: none;
        padding: 10px;
        width: 100%;
    }
    .header__searchbox__input:focus {
        border: 2px solid gray;
        border-right: none;
    }
    .header__searchbox__input::placeholder {
        color: lightgray;
    }

    .header__searchbox__button {
        background: #f00;
        border: none;
        cursor: pointer;
        height: 100%;
        padding: 10px;
    }
    .header__searchbox__button:hover {
        background: #e00;
    }
    
    .header__searchbox__button__img {
        height: 100%;
    }

    .divbar {
        background: black;
        height: 5px;
        width: 100%;
    }
</style>
