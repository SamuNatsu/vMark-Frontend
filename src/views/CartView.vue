<script setup>
import Topbar from '../components/Topbar.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import { cart } from '../modules/Cart';
import { ref, watch } from 'vue';
import axios from 'axios';
import stores from '../pinia';
import { storeToRefs } from 'pinia';

const i18n = stores.i18n
const skin = stores.skin
const { lang } = storeToRefs(i18n)
const { sitename } = storeToRefs(skin)

watch(lang, ()=>document.querySelector("title").innerHTML = i18n.getLang("title.cart") + " | " + (sitename || "vMark"))
document.querySelector("title").innerHTML = i18n.getLang("title.cart") + " | " + (sitename || "vMark")

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
const fetchItems = async ()=>{
    itemList.value = []

    cart.get().forEach(async (v)=>{
        let res = (await axios.get(vMarkBackendAPI + 'api/item/?iid=' + v.iid)).data
        if (res.status === "failed")
            return

        let ti = {...res.data, count: v.count}
        ti.url = '/item?iid=' + ti.iid
        ti.img = ti.aid === undefined ? '/svg/item.svg' : vMarkBackendAPI + 'api/attachment/get?aid=' + ti.aid
        ti.dPrice = ti.sale === undefined ? convertPrice(ti.price) : '<del style="color:gray">' + convertPrice(ti.price) + '</del> <span style="color:red"><b>' + convertPrice(ti.sale) + '</b></span>'

        itemList.value.push(ti)
    })
}
await fetchItems()

</script>

<template>
    <Topbar/>
    <Header/>

    <div class="wrapper">
        <h1 v-if="itemList.length === 0">{{ i18n.getLang("cart.empty") }}</h1>
        <table class="list" v-if="itemList.length !== 0">
            <tr v-for="i in itemList">
                <td class="list__img"><img :src="i.img"/></td>
                <td class="list__name"><a :href="i.url" target="_blank">{{ i.name }}</a></td>
                <td>{{ i.count }}</td>
            </tr>
        </table>
        <div class="total">
            <span class="total__text">{{ i18n.getLang("cart.total") }}</span>
        </div>
    </div>

    <Footer/>
</template>

<style scoped>
    .wrapper {
        background: #fff;
        border-radius: 20px;
        align-items: flex-start;
        margin: 40px auto;
        padding: 50px 5%;
        width: 75%;
    }

    .list {
        width: 100%;
        border-collapse: collapse;
    }

    .list__img {
        width: 20%;
    }
    .list__img img {
        width: 100%;
    }

    .list__name {
        width: 40%;
        padding: 30px;
        font-weight: bold;
        font-size: large;
    }
    .list__name a {
        color: #000;
        text-decoration: none;
    }
    .list__name a:hover {
        text-decoration: underline;
    }

    .total {
        margin-top: 30px;
        font-weight: bold;
        font-size: 1.5em;
    }
</style>
