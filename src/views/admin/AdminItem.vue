<script setup>
import axios from 'axios';
import { ref } from 'vue';
import stores from '../../pinia';
import ItemEdit from '../../components/ItemEdit.vue';

const i18n = stores.i18n

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

    let res = (await axios.get(vMarkBackendAPI + 'api/item/')).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }
    if (res.data === undefined)
        return

    res.data.forEach((v, i, a)=>{
        a[i].url = '/item?iid=' + v.iid
        a[i].img = v.aid === undefined ? '/svg/item.svg' : vMarkBackendAPI + 'api/attachment/get?aid=' + v.aid
    })
    itemList.value = res.data
}
await fetchItems()

const editInfo = ref({})
const editSwitch = ref(false)
const editType = ref("")
const edit = (info)=>{
    editInfo.value = info
    editType.value = 'edit'
    editSwitch.value = true
}
const editDone = ()=>{
    editSwitch.value = false
    location.href = location.href
}

const newItem = async ()=>{
    let res = (await axios.post(
        vMarkBackendAPI + "api/item/add",
        {
            name: "New Item",
            price: "0",
            cid: 1
        },
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    )).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }

    alert("Success")
    location.href = location.href
}

const cateList = ref([])
const fetchCate = async ()=>{
    cateList.value = []
    let res = (await axios.get(vMarkBackendAPI + 'api/category/')).data
    cateList.value = res.data
}
await fetchCate()
const newCate = async ()=>{
    let res = (await axios.post(
        vMarkBackendAPI + "api/category/add",
        {name: "New"},
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    )).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }
    alert("Success")
    location.href = location.href
}
const cateRename = async (cid, parent)=>{
    let name = prompt("New name")
    if (name === null)
        return
    let res = (await axios.post(
        vMarkBackendAPI + "api/category/update",
        {cid, name, parent: parent ?? null},
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    )).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }
    alert("Success")
    location.href = location.href
}
const cateReparent = async (cid, name)=>{
    let n = prompt("New parent cid")
    if (n === null)
        return
    let res = (await axios.post(
        vMarkBackendAPI + "api/category/update",
        {cid, parent: n, name},
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    )).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }
    alert("Success")
    location.href = location.href
}

</script>

<template>
    <div class="wrapper">
        <h1>{{ i18n.getLang("admin.menu.item") }}</h1>
        <hr/>
        <h2>{{ i18n.getLang("admin.main.item.cate.title") }}</h2>
        <div class="btn" @click="newCate()">{{ i18n.getLang("category.add") }}</div>
        <table class="item-list">
            <tr>
                <th>{{ i18n.getLang("category.cid") }}</th>
                <th>{{ i18n.getLang("category.name") }}</th>
                <th>{{ i18n.getLang("category.parent") }}</th>
                <th>{{ i18n.getLang("item.op") }}</th>
            </tr>
            <tr v-for="i in cateList">
                <td>{{ i.cid }}</td>
                <td>{{ i.name }}</td>
                <td>{{ i.parent }}</td>
                <td style="display:flex;justify-content: center;">
                    <div class="op" @click="cateRename(i.cid, i.parent)">{{ i18n.getLang("category.rename") }}</div>
                    <div class="op" @click="cateReparent(i.cid, i.name)">{{ i18n.getLang("category.reparent") }}</div>
                </td>
            </tr>
        </table>
        <hr/>
        <h2>{{ i18n.getLang("admin.main.item.list.title") }}</h2>
        <div class="btn" @click="newItem()">{{ i18n.getLang("admin.main.item.add.title") }}</div>
        <table class="item-list">
            <tr>
                <th>{{ i18n.getLang("item.iid") }}</th>
                <th>{{ i18n.getLang("item.name") }}</th>
                <th>{{ i18n.getLang("item.desc") }}</th>
                <th>{{ i18n.getLang("item.cid") }}</th>
                <th>{{ i18n.getLang("item.price") }}</th>
                <th>{{ i18n.getLang("item.sale") }}</th>
                <th>{{ i18n.getLang("item.aid") }}</th>
                <th>{{ i18n.getLang("item.remain") }}</th>
                <th>{{ i18n.getLang("item.op") }}</th>
            </tr>
            <tr v-for="i in itemList">
                <td>{{ i.iid }}</td>
                <td>{{ i.name }}</td>
                <td>{{ i.desc }}</td>
                <td>{{ i.cid }}</td>
                <td>{{ convertPrice(i.price) }}</td>
                <td>{{ i.sale === undefined ? "NULL" : convertPrice(i.sale) }}</td>
                <td>{{ i.aid === undefined ? "NULL" : i.aid }}</td>
                <td>{{ i.remain }}</td>
                <td style="display:flex;justify-content: center;">
                    <div class="op" @click="edit(i)">{{ i18n.getLang("item.edit") }}</div>
                </td>
            </tr>
        </table>
        <ItemEdit :info="editInfo" v-if="editSwitch" :done="editDone" :type="editType"/>
    </div>
</template>

<style scoped>
    hr {
        border: 0;
        border-bottom: 2px dashed gray;
    }

    .item-list {
        width: 100%;
        border-collapse: collapse;
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        margin: 20px 0;
    }
    .item-list td, .item-list th {
        min-width: 100px;
        padding: 5px 10px;
        text-align: center;
    }
    .item-list th {
        border-bottom: 2px solid black;
    }
    .item-list td {
        border-bottom: 1px dashed lightgray;
    }

    .op {
        color: royalblue;
        margin: 0 10px;
        text-decoration: none;
        cursor: pointer;
        width: fit-content;
    }
    .op:hover {
        color: #e00;
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
</style>
