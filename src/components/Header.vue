<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Stores
import { useI18NStore } from "../stores/I18N.js";
import { useSkinStore } from "../stores/Skin.js";

// Router
const router = useRouter();

// I18N store
const I18N = useI18NStore();
await I18N.init();

// Skin store
const skin = useSkinStore();
await skin.init();
const { header } = skin;

// Title click
const titleClick = ()=>location.href = location.protocol;

// Search click
const searchText = ref("");
const searchClick = ()=>{
    if (searchText.value === "")
        location.href = location.href;

    router.push({
        name: "search",
        query: {
            t: searchText.value
        }
    });
}

// Default
const defaultStyle = "font-size: 4em; font-weight: bold";
const defaultInnerHtml = '<span style="color:red">v</span><span>Mark</span>';
</script>

<template>
    <div class="header" :style="header.mainStyle">
        <div 
            class="header__title"
            :style="header.titleStyle || defaultStyle" 
            @click="titleClick"
            v-html="header.titleInnerHtml || defaultInnerHtml"
        />
        <div class="header__searchbox">
            <input 
                class="header__searchbox__input" 
                type="text" 
                :placeholder="I18N.getLang('header.searchbox.input')"
                v-model="searchText"
            />

            <button 
                class="header__searchbox__button" 
                :title="I18N.getLang('header.searchbox.button')"
                @click="searchClick"
            >
                <img 
                    class="header__searchbox__button__img" 
                    src="/svg/search.svg"
                />
            </button>
        </div>
    </div>
    <div class="divbar" :style="header.divbarStyle"></div>
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
