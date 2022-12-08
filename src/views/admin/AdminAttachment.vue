<script setup>
import { computed, ref } from '@vue/reactivity';
import axios from 'axios';
import { onMounted } from 'vue';
import stores from '../../pinia';

const i18n = stores.i18n;

const API = ref(vMarkBackendAPI);
const actUrl = computed(()=>vMarkBackendAPI + 'api/attachment/upload')

const attList = ref([])

const refresh = async ()=>{
    attList.value = [];
    let ret = (await axios.get(vMarkBackendAPI + 'api/attachment/')).data;
    if (ret.status === "failed")
        return;
    attList.value = ret.data;
}

onMounted(()=>refresh())

const delAtt = async (aid)=>{
    let b = confirm(i18n.getLang("admin.main.attachment.list.delete.confirm").format(aid));
    if (b === false)
        return;

    let ret = (await axios.post(
        vMarkBackendAPI + 'api/attachment/delete',
        {aid},
        {headers:{"Content-Type": "application/x-www-form-urlencoded"}})).data;
    if (ret.status === "failed")
        alert(i18n.getLang(ret.message));
    else {
        alert(i18n.getLang("admin.main.attachment.list.delete.success"))
        refresh();
    }
}
const rename = async (aid)=>{
    let name = prompt(i18n.getLang("admin.main.attachment.list.rename.prompt"))
    if (name === null)
        return;
    
    let ret = (await axios.post(
        vMarkBackendAPI + 'api/attachment/rename',
        {aid, new_name: name},
        {headers:{"Content-Type": "application/x-www-form-urlencoded"}})).data;
    if (ret.status === "failed")
        alert(i18n.getLang(ret.message));
    else {
        alert(i18n.getLang("admin.main.attachment.list.rename.success"))
        refresh();
    }
}
</script>

<template>
    <div class="wrapper">
        <h1>{{ i18n.getLang("admin.menu.attachment") }}</h1>
        <hr/>
        <h2>{{ i18n.getLang("admin.main.attachment.upload.title") }}</h2>
        <form method="post" enctype="multipart/form-data" :action="actUrl">
            <input name="file" class="upload" type="file" accept="image/png"/>
            <button class="btn" type="submit">{{ i18n.getLang("admin.main.attachment.upload.btn") }}</button>
        </form>
        <hr/>
        <h2>{{ i18n.getLang("admin.main.attachment.list.title") }}</h2>
        <button class="btn" @click="refresh()">{{ i18n.getLang("admin.main.attachment.list.refresh") }}</button>
        <table class="att-list">
            <tr>
                <th>{{ i18n.getLang("admin.main.attachment.list.thumbnail") }}</th>
                <th>{{ i18n.getLang("admin.main.attachment.list.info") }}</th>
                <th>{{ i18n.getLang("admin.main.attachment.list.op") }}</th>
            </tr>
            <tr v-for="i in attList">
                <td class="att-list__img"><img :src="(API + 'api/attachment/get?aid=' + i.aid)"/></td>
                <td class="att-list__info">
                    <div><b>aid</b>:&emsp;{{ i.aid }}</div>
                    <div><b>{{ i18n.getLang("admin.main.attachment.list.name") }}</b>:&emsp;{{ i.name }}</div>
                    <div><b>{{ i18n.getLang("admin.main.attachment.list.path") }}</b>:&emsp;{{ i.path }}</div>
                    <div><b>url</b>:&emsp;{{ (API + 'api/attachment/get?aid=' + i.aid) }}</div>
                </td>
                <td>
                    <button class="btn" @click="delAtt(i.aid)">
                        {{ i18n.getLang("admin.main.attachment.list.delete.title") }}
                    </button>
                    <button class="btn" @click="rename(i.aid)">
                        {{ i18n.getLang("admin.main.attachment.list.rename.title") }}
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
    hr {
        border: 0;
        border-bottom: 2px dashed gray;
    }

    .upload {
        border: 1px dashed lightgray;
        padding: 15px;
    }

    .btn {
        background: #333;
        border: 2px solid #333;
        color: #fff;
        cursor: pointer;
        margin: 0 10px;
        padding: 5px;
        transition: background .2s, color .2s;
    }
    .btn:hover {
        background: 0;
        color: #000;
    }

    .att-list {
        border-top: 2px solid #000;
        border-bottom: 2px solid #000;
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
    }
    .att-list th {
        padding: 10px 0;
    }
    .att-list tr {
        border-top: 2px dashed lightgray;
    }
    .att-list td {
        padding: 10px;
    }
    .att-list__img {
        width: 30%;
    }
    .att-list__img>img {
        width: 100%;
        border: 1px solid gray;
    }

    .att-list__info {
        width: 40%;
        border-left: 1px dashed lightgray;
        border-right: 1px dashed lightgray;
    }
    .att-list__info>div {
        margin: 5px 0;
    }
</style>
