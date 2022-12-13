<script setup>
import axios from 'axios';
import { ref } from 'vue';
import stores from '../../pinia';

const i18n = stores.i18n

const itemList = ref([])
const fetchAll = async ()=>{
    const res = (await axios.get(vMarkBackendAPI + "api/item/")).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }
    itemList.value = res.data
}
await fetchAll()

</script>

<template>
    <div class="wrapper">
        <h1>{{ i18n.getLang("admin.menu.item") }}</h1>
        <hr/>
        <h2>{{ i18n.getLang("admin.main.item.add.title") }}</h2>
        <hr/>
        <h2>{{ i18n.getLang("admin.main.item.list.title") }}</h2>
    </div>
</template>

<style scoped>
    hr {
        border: 0;
        border-bottom: 2px dashed gray;
    }
</style>
