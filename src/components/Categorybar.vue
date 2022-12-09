<script setup>
import axios from "axios";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import stores from "../pinia";

const i18n = stores.i18n
const skin = stores.skin

const { topAd } = storeToRefs(skin);

const categoryList = ref([])
const fetchCategory = async ()=>{
    let res = (await axios.get(vMarkBackendAPI + "api/category/")).data
    if (res.status === "failed") {
        alert(i18n.getLang(res.message))
        return
    }

    res.data.forEach((v, i, a)=>{
        a[i].url = '/search?cid=' + v.cid
    })

    categoryList.value = res.data.filter((v)=>v.parent === undefined)
    res.data.filter((v)=>v.parent !== undefined).forEach((v1)=>{
        categoryList.value.forEach((v2, i, a)=>{
            if (v2.cid === v1.parent) {
                if (v2.sub === undefined)
                    a[i].sub = [v1]
                else 
                    a[i].sub.push(v1)
            }
        })
    })
}
await fetchCategory()

</script>

<template>
    <!-- Container -->
    <div class="category">
        <!-- Parent category list -->
        <div class="category__parent">
            <!-- Parent category item -->
            <div 
                v-for="i in categoryList" 
                class="category__parent__item" 
                :title="i.name"
            >
                <RouterLink :to="i.url">{{ i.name }}</RouterLink>
                <!-- Sub category list -->
                <div v-if="i.sub" class="category__sub">
                    <!-- Sub category item -->
                    <div
                        v-for="j in i.sub" 
                        class="category__sub__item" 
                        :title="j.name"
                    >
                        <RouterLink :to="j.url">{{ j.name }}</RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <!-- Side advertisement -->
        <div class="category__ad" v-html="topAd"></div>
    </div>
</template>

<style scoped>
    .category {
        background: #fff;
        border-radius: 20px;
        box-shadow: lightgray 1px 1px 5px;
        display: flex;
        margin: 30px auto;
        min-height: 300px;
        min-width: 700px;
        overflow: hidden;
        width: 70%;
    }

    .category__parent {
        border-right: 1px solid #eee;
        display: flex;
        flex-direction: column;
        padding: 15px 0;
        position: relative;
        min-width: 10%;
    }

    .category__parent__item {
        font-weight: bold;
        margin: 5px 0;
        padding: 5px 20px;
        text-align: center;
    }
    .category__parent__item:hover {
        background: #eee;
    }
    .category__parent__item:hover .category__sub {
        display: flex;
    }
    .category__parent__item>a {
        color: inherit;
        text-decoration: none;
    }
    .category__parent__item>a:hover {
        color: red;
    }

    .category__sub {
        align-content: flex-start;
        background: #fff;
        border-left: 3px solid #eee;
        border-right: 2px solid #eee;
        display: none;
        flex-wrap: wrap;
        height: 100%;
        width: 500px;
        overflow-y: scroll;
        padding: 20px;
        position: absolute;
        left: calc(100%);
        top: 0;
        white-space: nowrap;
    }
    .category__sub::-webkit-scrollbar {
        width: 5px;
    }
    .category__sub::-webkit-scrollbar-track {
        background: 0;
    }
    .category__sub::-webkit-scrollbar-thumb {
        background: lightgray;
        border-radius: 5px;
    }

    .category__sub__item {
        font-weight: normal;
        margin: 5px 20px;
    }
    .category__sub__item>a {
        color: inherit;
        text-decoration: none;
    }
    .category__sub__item>a:hover {
        color: red;
    }

    .category__ad {
        width: 100%;
    }
</style>
