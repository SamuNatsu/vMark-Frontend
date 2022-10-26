<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Stores
import { useI18NStore } from "../stores/I18N";

// Get properties
const props = defineProps({
    header: Object
});

// Router
const router = useRouter();

// I18N store
const I18N = useI18NStore();

// Search click
const searchText = ref("");
const searchClick = ()=>{
    if (searchText === "")
        return;
    router.push({
        name: "search",
        query: {
            t: searchText.value
        }
    });
}
</script>

<template>
    <div class="header">
        <div :style="header.style" v-html="header.title"></div>
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
</style>
