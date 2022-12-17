<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";

import Topbar from "../components/Topbar.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue"
import stores from "../pinia";
import { useRouter } from "vue-router";

document.querySelector("title").innerHTML = "Center - vMark";

const router = useRouter()

const i18n = stores.i18n
const user = stores.user

const orderList = ref([])
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
const search = async ()=>{
    orderList.value = []
    let res = (await axios.get(vMarkBackendAPI + "api/order/?uid=" + user.getUid)).data
    if (res.status === "failed") {
        return
    }
   res.data.forEach(async (v, i, a)=>{
        let r = (await axios.get(vMarkBackendAPI + "api/order/?oid=" + v.oid)).data
        let price = 0
        for (let j = 0; j < r.data.length; ++j) {
            let ttr = (await axios.get(vMarkBackendAPI + 'api/item/?iid=' + r.data[j].iid)).data
            if (ttr.status === "failed")
                ttr.data = {}
            r.data[j].name = ttr.data.name ?? "(NULL)"
            price += r.data[j].price * r.data[j].count
            r.data[j].price = convertPrice(price)
        }
        a[i].order = r.data
        a[i].price = convertPrice(price)
        orderList.value.push(a[i])
    })
}
await search()
watch(storeToRefs(user).user, async ()=>await search())

const updateName = async ()=>{
    let name = prompt("New name")
    if (name === null)
        return
    let res = (await axios.post(
        vMarkBackendAPI + "api/user/update/info",
        {uid: user.getUid, new_name: name},
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    )).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }
    alert("Success")
    user.logout();
	router.push({name: "index"});
    location.href = location.href
}

const updatePass = async ()=>{
    let name = prompt("New password")
    if (name === null)
        return
    let res = (await axios.post(
        vMarkBackendAPI + "api/user/update/info",
        {uid: user.getUid, new_password: CryptoJS.SHA256(name).toString()},
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    )).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }
    alert("Success")
    user.logout();
	router.push({name: "index"});
    location.href = location.href
}

</script>

<template>
    <Topbar />
	<Header />

    <div class="wrapper">
        <table class="info-list">
            <tr>
                <th>{{ i18n.getLang("center.account") }}</th>
                <td>{{ user.getAccount }}</td>
            </tr>
            <tr>
                <th>{{ i18n.getLang("center.name") }}</th>
                <td>{{ user.getName ?? "(NULL)" }}</td>
                <td><div class="btn" @click="updateName()">{{ i18n.getLang("center.modify") }}</div></td>
            </tr>
        </table>
        <div>
            <td><div class="btn" @click="updatePass">{{ i18n.getLang("center.repass") }}</div></td>
        </div>
        <hr/>
        <table class="order-list">
            <tr>
                <th>{{ i18n.getLang("order.oid") }}</th>
                <th>{{ i18n.getLang("order.date") }}</th>
                <th>{{ i18n.getLang("order.list") }}</th>
                <th>{{ i18n.getLang("order.price") }}</th>
                <th>{{ i18n.getLang("order.address") }}</th>
            </tr>
            <tr v-for="i in orderList">
                <td>{{ i.oid }}</td>
                <td>{{ new Date(i.timestamp).toLocaleString() }}</td>
                <td>
                    <table class="item-list">
                        <tr v-for="j in i.order">
                            <td><RouterLink :to="'/item?iid=' + j.iid">{{ j.name }}</RouterLink></td>
                            <td>
                                <span class="list-price">{{ j.price }}</span>
                                <span class="list-count"> x {{ j.count }}</span>
                            </td>
                        </tr>
                    </table>
                </td>
                <td class="list-price">{{ i.price }}</td>
                <td>{{ i.address }}</td>
            </tr>
        </table>
    </div>

	<Footer />
</template>

<style scoped>
    hr {
        border: 0;
        border-bottom: 2px dashed gray;
    }

    .wrapper {
        background: #fff;
        border-radius: 20px;
        box-shadow: lightgray 1px 1px 5px;
        flex-wrap: wrap;
        margin: 30px auto;
        padding: 20px;
        overflow: hidden;
        width: 70%;
    }

    .btn {
        background: #333;
        border: 2px solid #333;
        color: #fff;
        cursor: pointer;
        margin: 0 10px;
        padding: 5px;
        width: fit-content;
        transition: background .2s, color .2s;
    }
    .btn:hover {
        background: 0;
        color: #000;
    }

    .info-list {
        width: 100%;
        margin: 20px 0;
    }

    .order-list {
        width: 100%;
        border-collapse: collapse;
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        margin: 20px 0;
    }
    .order-list td, .order-list th {
        min-width: 100px;
        padding: 5px 10px;
        text-align: center;
    }
    .order-list th {
        border-bottom: 2px solid black;
    }
    .order-list td {
        border-bottom: 1px dashed lightgray;
    }

    .item-list {
        width: 100%;
    }

    .list-price::before {
        content: '￥'
    }
    .list-count {
        color: gray;
        font-size: small;
    }
</style>
