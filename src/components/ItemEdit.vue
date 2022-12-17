<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import stores from '../pinia';

const props = defineProps(['info','type', 'done'])

const i18n = stores.i18n

const name = ref("")
const desc = ref("")
const cid = ref("")
const price = ref("")
const sale = ref("NULL")
const aid = ref("NULL")
const remain = ref("")

const save = async ()=>{
    let res = (await axios.post(
        vMarkBackendAPI + "api/item/update",
        {
            iid: props.info.iid,
            name: name.value,
            cid: cid.value,
            price: price.value,
            remain: remain.value,
            aid: aid.value === "NULL" ? null : aid.value,
            sale: sale.value === "NULL" ? null : sale.value,
            description: desc.value
        },
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    )).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }

    alert("Success")

    props.done()
}
const del = async ()=>{
    let res = (await axios.post(
        vMarkBackendAPI + "api/item/delete",
        {iid: props.info.iid},
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    )).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }

    alert("Success")

    props.done()
}

onMounted(()=>{
    name.value = props.info.name ?? ""
    desc.value = props.info.desc ?? ""
    cid.value = props.info.cid ?? ""
    price.value = props.info.price ?? ""
    sale.value = props.info.sale ?? "NULL"
    aid.value = props.info.aid ?? "NULL"
    remain.value = props.info.remain ?? ""
})

</script>

<template>
    <div class="item-edit" @click="props.done()">
        <div class="container" @click.stop="(()=>{})()">
            <table class="item-info">
                <tr>
                    <th>{{ i18n.getLang("item.name") }}</th>
                    <td><input type="text" v-model="name"/></td>
                </tr>
                <tr>
                    <th>{{ i18n.getLang("item.desc") }}</th>
                    <td><textarea v-model="desc"/></td>
                </tr>
                <tr>
                    <th>{{ i18n.getLang("item.cid") }}</th>
                    <td><input type="text" v-model="cid"/></td>
                </tr>
                <tr>
                    <th>{{ i18n.getLang("item.price") }}</th>
                    <td><input type="text" v-model="price"/></td>
                </tr>
                <tr>
                    <th>{{ i18n.getLang("item.sale") }}</th>
                    <td><input type="text" v-model="sale"/></td>
                </tr>
                <tr>
                    <th>{{ i18n.getLang("item.aid") }}</th>
                    <td><input type="text" v-model="aid"/></td>
                </tr>
                <tr>
                    <th>{{ i18n.getLang("item.remain") }}</th>
                    <td><input type="text" v-model="remain"/></td>
                </tr>
            </table>
            <div v-if="props.type == 'edit'" style="display: flex;margin: 20px 0">
                <div class="btn" @click="save()">{{ i18n.getLang("item.save") }}</div>
                <div class="btn" @click="del()">{{ i18n.getLang("item.delete") }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .item-edit {
        z-index: 999;
        position: fixed;
        background: #0007;
        display: flex;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

    .container {
        background: #fff;
        border-radius: 10px;
        padding: 20px;
        z-index: 1000;
        display: block;
        width: 50%;
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

    .item-info {
        width: 100%;
    }
    .item-info th {
        padding: 10px;
    }
    .item-info td {
        padding: 10px;
    }
    .item-info input {
        width: 100%;
    }
    .item-info textarea {
        width: 100%;
        height: 100px;
    }
</style>
