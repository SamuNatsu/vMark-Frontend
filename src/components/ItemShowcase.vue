<script setup>
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";

// Store
import { useI18NStore } from "../stores/I18N";
import { useItemStore } from "../stores/Item";

// I18N store
const i18n = useI18NStore();
await i18n.init();

// Item store
const item = useItemStore();
const { items, pageNav } = storeToRefs(item);

// Page navigation
const pageNavLast = computed(()=>pageNav.value.last ? i18n.getLang("pageNav.last") : "");
const pageNavLabel = computed(()=>{
    
});
const pageNavNext = computed(()=>pageNav.value.next ? i18n.getLang("pageNav.next") : "");
</script>

<template>
    <div class="showcase">
        <div v-for="i in items" class="showcase__item">
            <div class="showcase__item__wrapper">
                <div class="showcase__item__img">
                    <RouterLink :to="item.getItemLink(i.iid)" :title="i.name">
                        <img :src="i.mainPic || '/svg/item.svg'"/>
                    </RouterLink>
                </div>
                <div class="showcase__item__info">
                    <div class="showcase__item__name">
                        <RouterLink :to="item.getItemLink(i.iid)" :title="i.name">
                            {{ i.name }}
                        </RouterLink>
                    </div>
                    <div class="showcase__item__price" v-html="item.getPrice(i)"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-nav" v-if="pageNav.last || pageNav.next">
        <div class="page-nav__btn"><routerLink :to="pageNav.last ?? '#'">{{ pageNavLast }}</routerLink></div>
        <div class="page-nav__label" v-html="pageNavLabel"/>
        <div class="page-nav__btn"><RouterLink :to="pageNav.next ?? '#'">{{ pageNavNext }}</RouterLink></div>
    </div>
</template>

<style scoped>
    .showcase {
        background: #fff;
        border-radius: 20px;
        box-shadow: lightgray 1px 1px 5px;
        display: flex;
        flex-wrap: wrap;
        margin: 30px auto;
        padding: 20px;
        overflow: hidden;
        width: 70%;
    }

    .showcase__item {
        height: 350px;
        padding: 20px;
        width: 25%
    }

    .showcase__item__wrapper {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        width: 100%;
    }
    .showcase__item__wrapper:hover {
        box-shadow: gray 1px 1px 5px;
    }

    .showcase__item__img {
        border: 1px dashed gray;
        margin-top: 5%;
        max-height: 70%;
        overflow: hidden;
        width: 90%
    }

    .showcase__item__info {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 20%;
        margin-bottom: 5%;
        max-width: 90%;
    }

    .showcase__item__name {
        font-size: large;
        font-weight: bold;
        margin-bottom: 5px;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .showcase__item__name>a {
        color: inherit;
        text-decoration: none;
    }
    .showcase__item__name>a:hover {
        text-decoration: underline;
    }

    .showcase__item__price {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    .showcase__item__price::before {
        content: '¥'
    }

    .page-nav {
        background: #fff;
        border-radius: 20px;
        box-shadow: lightgray 1px 1px 5px;
        display: flex;
        justify-content: space-between;
        margin: 30px auto;
        padding: 20px;
        overflow: hidden;
        width: 70%;
    }

    .page-nav__label {
        display: flex;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    .page-nav__label>div {
        margin: 0 10px;
    }

    .page-nav__btn>a {
        color: inherit;
        font-weight: bold;
        text-decoration: none;
    }
    .page-nav__btn>a:hover {
        text-decoration: underline;
    }
</style>
