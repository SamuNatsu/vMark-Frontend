<script setup>
import axios from 'axios';
import { ref } from 'vue';
import stores from '../../pinia';

const i18n = stores.i18n
const skin = stores.skin

const sitename = ref(skin.sitename || "")
const headerMainStyle = ref(skin.headerMainStyle || "")
const headerTitleInnerHtml = ref(skin.headerTitleInnerHtml || "")
const headerTitleStyle = ref(skin.headerTitleStyle || "")
const background = ref(skin.background || "")

const submit = async ()=>{
    let tmp = {
        sitename: sitename.value,
        headerMainStyle: headerMainStyle.value,
        headerTitleInnerHtml: headerTitleInnerHtml.value,
        headerTitleStyle: headerTitleStyle.value,
        background: background.value
    }
    let res = (await axios.post(
        vMarkBackendAPI + "api/option/update/skin",
        {skin: JSON.stringify(tmp)},
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    )).data
    console.log(res)
    if (res.status === "failed") {
        alert(res.message)
        return
    }
    alert(i18n.getLang("option.success"))
}

</script>

<template>
    <div class="option-wrapper">
        <h1>{{ i18n.getLang("admin.menu.option") }}</h1>
        <hr/>
        <table class="option-list">
            <tr>
                <td><b>{{ i18n.getLang("option.sitename") }}</b></td>
                <td><input type="text" v-model="sitename"/></td>
            </tr>
            <tr>
                <td><b>{{ i18n.getLang("option.header_main_style") }}</b></td>
                <td><textarea type="text" v-model="headerMainStyle"/></td>
            </tr>
            <tr>
                <td><b>{{ i18n.getLang("option.header_title_inner_html") }}</b></td>
                <td><textarea type="text" v-model="headerTitleInnerHtml"/></td>
            </tr>
            <tr>
                <td><b>{{ i18n.getLang("option.header_title_style") }}</b></td>
                <td><textarea type="text" v-model="headerTitleStyle"/></td>
            </tr>
            <tr>
                <td><b>{{ i18n.getLang("option.background") }}</b></td>
                <td><textarea type="text" v-model="background"/></td>
            </tr>
        </table>
        <div class="btn" @click="submit()">{{ i18n.getLang("option.submit") }}</div>
    </div>
</template>

<style scoped>
    hr {
        border: 0;
        border-bottom: 2px dashed gray;
    }

    .option-list {
        border-collapse: collapse;
        margin: 20px 0;
        width: 50%;
    }
    .option-list td {
        padding: 10px;
    }
    .option-list input {
        width: 100%;
    }
    .option-list textarea {
        width: 100%;
        height: 100px;
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
