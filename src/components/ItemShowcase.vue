<script setup>
import axios from "axios";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute} from "vue-router";

import stores from "../pinia";

const route = useRoute();

const i18n = stores.i18n;

const itemList = ref([])
const convertPrice = (x)=>{
    let str = "" + x;

    if (str.length <= 2) {
        while (str.length < 2)
            str = "0" + str
        return "0." + str;
    }

    let tmp = str.substring(0, str.length - 2)
    let arr = []
	for (let i = tmp.length; i > 0; i -= 3)
		arr.push(tmp.substring(Math.max(0, i - 3), i))
    return arr.reverse().join(",") + "." + str.substring(str.length - 2)
}
const fetchItems = async (data)=>{
    itemList.value = []

    let qry_str = ""
    Object.keys(data || route.query).forEach((k)=>{
        if (qry_str.length > 0)
            qry_str += '&'
        qry_str += encodeURI(k) + '=' + encodeURI((data || route.query)[k])
    })

    let res = (await axios.get(vMarkBackendAPI + 'api/item/?' + qry_str)).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }

    res.data.forEach((v, i, a)=>{
        a[i].url = '/item?iid=' + v.iid
        a[i].img = v.aid === undefined ? '/svg/item.svg' : vMarkBackendAPI + 'api/attachment/get?aid=' + v.aid
        a[i].dPrice = v.sale === undefined ? convertPrice(v.price) : '<del style="color:gray">' + convertPrice(v.price) + '</del> <span style="color:red"><b>' + convertPrice(v.sale) + '</b></span>'
    })
    itemList.value = res.data
}
await fetchItems()

onBeforeRouteUpdate(async (to)=>{
    if (to.path === route.path)
        await fetchItems(to.query)
})
</script>

<template>
    <!-- Showcase -->
    <div class="showcase">
        <h1 v-if="itemList.length === 0">{{ i18n.getLang("item.not_found") }}</h1>
        <!-- Item -->
        <div v-for="i in itemList" class="showcase__item">
            <div class="showcase__item__wrapper">
                <!-- Item image -->
                <div class="showcase__item__img">
                    <RouterLink :to="i.url" :title="i.name">
                        <img :src="i.img"/>
                    </RouterLink>
                </div>

                <!-- Item info -->
                <div class="showcase__item__info">
                    <!-- Item name -->
                    <div class="showcase__item__name">
                        <RouterLink :to="i.url" :title="i.name">
                            {{ i.name }}
                        </RouterLink>
                    </div>

                    <!-- Item price -->
                    <div v-html="i.dPrice" class="showcase__item__price"></div>

                    <!-- Sold out -->
                    <div v-if="(i.remain === 0)" class="showcase__item__soldout">{{ i18n.getLang("message.item.sold_out") }}</div>
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
    .showcase__item__wrapper:hover {
        box-shadow: gray 1px 1px 5px;
    }

    .showcase__item__img {
        margin-top: 5%;
        height: 70%;
        overflow: hidden;
        width: 90%;
        display: flex;
        align-items: center;
    }
    .showcase__item__img img {
        border: 1px dashed gray;
        width: 100%;
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

    .showcase__item__soldout {
        color: red;
        font-weight: bold;
    }

    .page-nav {
        align-items: center;
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
        padding: 2px 5px;
    }

    .page-nav__label__btn {
        cursor: pointer;
    }
    .page-nav__label__btn:hover {
        background: gray;
        border-radius: 3px;
        color: white;
    }
    .page-nav__label__btn--current {
        background: gray;
        border-radius: 3px;
        color: white;
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
