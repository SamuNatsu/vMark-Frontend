<script setup>
// Store
import { useItemStore } from "../stores/Item.js";
import { useSkinStore } from "../stores/Skin.js";

// Item store
const item = useItemStore();
await item.init();
const { category } = item;

// Skin store
const skin = useSkinStore();
await skin.init();
const { topAd } = skin;

// Default top advertisement
const defaultAd = '<div style="background:repeating-linear-gradient(-45deg,#f74545,#f74545 8px,#ffffff 8px,#ffffff 40px);height:100%;width:100%"></div>';
</script>

<template>
    <div class="category">
        <div class="category__parent">
            <div v-for="i in category" class="category__parent__item" :title="i.name">
                <RouterLink :to="item.getCategoryLink(i.cid)">{{ i.name }}</RouterLink>
                <div class="category__sub" v-if="i.sub">
                    <div v-for="j in i.sub" class="category__sub__item" :title="j.name">
                        <RouterLink :to="item.getCategoryLink(j.cid)">{{ j.name }}</RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="category__ad" v-html="topAd || defaultAd"></div>
    </div>
</template>

<style scoped>
    .category {
        background: #fff;
        border-radius: 20px;
        box-shadow: lightgray 1px 1px 5px;
        display: flex;
        margin: 30px auto;
        min-height: 300px;
        min-width: 700px;
        overflow: hidden;
        width: 70%;
    }

    .category__parent {
        border-right: 1px solid #eee;
        display: flex;
        flex-direction: column;
        padding: 15px 0;
        position: relative;
        min-width: 10%;
    }

    .category__parent__item {
        font-weight: bold;
        margin: 5px 0;
        padding: 5px 20px;
        text-align: center;
    }
    .category__parent__item:hover {
        background: #eee;
    }
    .category__parent__item:hover .category__sub {
        display: flex;
    }
    .category__parent__item>a {
        color: inherit;
        text-decoration: none;
    }
    .category__parent__item>a:hover {
        color: red;
    }

    .category__sub {
        align-content: flex-start;
        background: #fff;
        border-left: 3px solid #eee;
        border-right: 2px solid #eee;
        display: none;
        flex-wrap: wrap;
        height: 100%;
        width: 500px;
        overflow-y: scroll;
        padding: 20px;
        position: absolute;
        left: calc(100%);
        top: 0;
        white-space: nowrap;
    }
    .category__sub::-webkit-scrollbar {
        width: 5px;
    }
    .category__sub::-webkit-scrollbar-track {
        background: 0;
    }
    .category__sub::-webkit-scrollbar-thumb {
        background: lightgray;
        border-radius: 5px;
    }

    .category__sub__item {
        font-weight: normal;
        margin: 5px 20px;
    }
    .category__sub__item>a {
        color: inherit;
        text-decoration: none;
    }
    .category__sub__item>a:hover {
        color: red;
    }

    .category__ad {
        width: 100%;
    }
</style>
