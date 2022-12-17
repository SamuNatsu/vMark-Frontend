<script setup>
import axios from 'axios';
import { ref } from 'vue';
import stores from '../../pinia';

const i18n = stores.i18n

const uid = ref(null)
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
    let res = (await axios.get(vMarkBackendAPI + "api/order/?uid=" + uid.value)).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }
   res.data.forEach(async (v, i, a)=>{
        let r = (await axios.get(vMarkBackendAPI + "api/order/?oid=" + v.oid)).data
        let price = 0
        for (let j = 0; j < r.data.length; ++j) {
            let ttr = (await axios.get(vMarkBackendAPI + 'api/item/?iid=' + r.data[j].iid)).data
            r.data[j].name = ttr.data.name
            price += r.data[j].price * r.data[j].count
            r.data[j].price = convertPrice(price)
        }
        a[i].order = r.data
        a[i].price = convertPrice(price)
        orderList.value.push(a[i])
    })
}

</script>

<template>
    <div class="order-wrapper">
        <h1>{{ i18n.getLang("admin.menu.order") }}</h1>
        <hr/>
        <div style="display:flex">
            <input type="text" placeholder="UID" v-model="uid"/>
            <div class="btn" @click="search()">{{ i18n.getLang("order.search") }}</div>
        </div>
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
</template>

<style scoped>
    hr {
        border: 0;
        border-bottom: 2px dashed gray;
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
