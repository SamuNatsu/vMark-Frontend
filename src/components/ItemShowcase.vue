<script setup>
// Store
import { useItemStore } from "../stores/Item";

// Item store
const item = useItemStore();
await item.init();
const { items } = item;
</script>

<template>
    <div class="showcase">
        <div v-for="i in items" class="showcase__item">
            <div class="showcase__item__wrapper">
                <div class="showcase__item__img">
                    <RouterLink :to="item.getItemLink(i.iid)" :title="i.name"><img :src="i.mainPic || '/svg/item.svg'"/></RouterLink>
                </div>
                <div class="showcase__item__info">
                    <div class="showcase__item__name">
                        <RouterLink :to="item.getItemLink(i.iid)" :title="i.name">{{ i.name }}</RouterLink>
                    </div>
                    <div class="showcase__item__price" v-html="item.getPrice(i)"></div>
                </div>
            </div>
        </div>
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

    .showcase__item__img {
        margin-top: 5%;
        max-height: 75%;
        overflow: hidden;
        width: 90%
    }

    .showcase__item__info {
        align-items: center;
        border: 1px solid gray;
        display: flex;
        flex-direction: column;
        height: 15%;
        margin-bottom: 5%;
    }

    .showcase__item__name {
        font-size: large;
        font-weight: bold;
        margin-bottom: 5px;
        text-overflow: ellipsis;
    }
    .showcase__item__name>a {
        color: inherit;
        text-decoration: none;
    }
    .showcase__item__name>a:hover {
        text-decoration: underline;
    }

    .showcase__item__price::before {
        content: '¥'
    }
</style>
