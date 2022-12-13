<script setup>
import Topbar from '../components/Topbar.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ItemSelect from '../components/ItemSelect.vue';

import { cart } from '../modules/Cart';
import { ref, watch, computed } from 'vue';
import axios from 'axios';
import stores from '../pinia';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const i18n = stores.i18n
const skin = stores.skin
const user = stores.user
const { lang } = storeToRefs(i18n)
const { sitename } = storeToRefs(skin)

watch(lang, ()=>document.querySelector("title").innerHTML = i18n.getLang("title.cart") + " | " + (sitename.value || "vMark"))
document.querySelector("title").innerHTML = i18n.getLang("title.cart") + " | " + (sitename.value || "vMark")

const router = useRouter()

const itemList = ref([])
const totalPrice = computed(()=>{
    let tot = 0
    itemList.value.forEach((v)=>{
        tot += (v.sale === undefined ? v.price :v.sale) * v.count
    })
    return tot
})
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
const updateItem = (iid, idx)=>{
    let itm = cart.get().filter((v)=>v.iid === iid)[0]
    let tmp = itemList.value.slice(idx, idx + 1)[0]
    tmp.count = itm.count
    itemList.value = itemList.value.slice(0, idx).concat(tmp).concat(itemList.value.slice(idx + 1))
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

        if (ti.count > res.data.remain) {
            ti.count = res.data.remain
            cart.set(ti.iid, {count: ti.count})
        }

        itemList.value.push(ti)
    })
}

const submit = async ()=>{
    if (!user.isLogined) {
        alert(i18n.getLang("message.auth.no_login"))
        return
    }
    let tmp = []
    itemList.value.forEach((v)=>{
        tmp.push({
            iid: v.iid,
            price: v.sale || v.price,
            count: v.count
        })
    })
    let str = JSON.stringify(tmp)
    let res = (await axios.post(
        vMarkBackendAPI + "api/order/add",
        {uid: user.getUid, order: str},
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}})).data
    if (res.status === "failed")
        alert(i18n.getLang(res.message))
    else {
        alert(i18n.getLang("cart.success"))
        router.push({name: "user"});
        cart.clear()
    }
}

await fetchItems()

</script>

<template>
    <Topbar/>
    <Header/>

    <div class="wrapper">
        <h1 v-if="itemList.length === 0">{{ i18n.getLang("cart.empty") }}</h1>
        <table class="list" v-if="itemList.length !== 0">
            <tr v-for="(i, index) in itemList">
                <td class="list__img"><img :src="i.img"/></td>
                <td class="list__name"><a :href="i.url" target="_blank">{{ i.name }}</a></td>
                <td class="list__count"><ItemSelect :refresh="fetchItems" :update="()=>updateItem(i.iid, index)" :max="i.remain" :cur="i.count" :iid="i.iid" :cart="true"/></td>
                <td class="list__price" v-html="i.dPrice"></td>
            </tr>
        </table>
        <div class="total" v-if="itemList.length !== 0">
            <span class="total__text">{{ i18n.getLang("cart.total") }}</span>
            <span class="total__price">{{ convertPrice(totalPrice) }}</span>
        </div>
        <div class="submit" v-if="itemList.length !== 0" @click="submit">{{ i18n.getLang("cart.submit") }}</div>
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

    .list tr {
        border-bottom: 1px dashed gray;
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

    .list__count {
        width: 20%;
    }

    .list__price {
        width: 20%;
        text-align: center;
    }
    .list__price::before {
        content: '￥';
    }
    .list__price::after {
        content: ' x1';
        color: gray;
    }

    .total {
        margin-top: 30px;
        font-weight: bold;
        font-size: 1.5em;
    }

    .total__price::before {
        content: '￥'
    }

    .submit {
        border: 2px solid black;
        border-radius: 15px;
        margin: 30px auto 0 auto;
        cursor: pointer;   
        padding: 10px 30px;
        width: fit-content;
        font-weight: bold;
        transition: all .2s;
    }
    .submit:hover {
        background: #000;
        color: #fff;
    }
</style>
