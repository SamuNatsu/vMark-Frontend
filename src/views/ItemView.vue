<script setup>
import Topbar from '../components/Topbar.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ItemSelect from '../components/ItemSelect.vue';

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useI18NStore } from '../pinia/I18N';
import { computed } from '@vue/reactivity';
import { cart } from "../modules/Cart"

const i18n = useI18NStore();
await i18n.init();

const router = useRouter();
const route = useRoute();

const info = ref({});
const getImg = computed(()=>info.value.aid === undefined ? "/svg/item.svg" : (vMarkBackendAPI + "api/attachment/get?aid=" + info.value.aid));

const getPrice = computed(()=>{
    let price = info.value.price;

	if (price < 100) {
		let str = "" + price;
		while (str.length < 2)
			str = "0" + str;
		return "￥ 0." + str;
	}

	let str = "" + price;
	let dec = str.substring(str.length - 2);
	str = str.substring(0, str.length - 2);
	let arr = [];
	for (let i = str.length; i > 0; i -= 3)
		arr.push(str.substring(Math.max(0, i - 3), i));
	return "￥ " + arr.reverse().join(",") + "." + dec;
});
const getSale = computed(()=>{
    let price = info.value.sale;

	if (price < 100) {
		let str = "" + price;
		while (str.length < 2)
			str = "0" + str;
		return "￥ 0." + str;
	}

	let str = "" + price;
	let dec = str.substring(str.length - 2);
	str = str.substring(0, str.length - 2);
	let arr = [];
	for (let i = str.length; i > 0; i -= 3)
		arr.push(str.substring(Math.max(0, i - 3), i));
	return "￥ " + arr.reverse().join(",") + "." + dec;
});

const itemSelectRef = ref(null);

onMounted(async ()=>{
    let iid = route.query.iid;
    let ret = (await axios.get(vMarkBackendAPI + "api/item/?iid=" + iid)).data;
    if (ret.status === "failed") {
        alert(i18n.getLang(ret.message));
        router.push({name: "index"});
        return;
    }
    info.value = ret.data;
});

const addCart = ()=>{
    cart.add({
        iid: info.value.iid,
        price: info.value.sale || info.value.price,
        count: itemSelectRef.value.cnt
    });
    alert(i18n.getLang("item.cart_added"))
}
</script>

<template>
    <Topbar/>
    <Header/>

    <div class="main">
        <img class="item__img" :src="getImg"/>
        <div class="item__info">
            <h1>{{ info.name }}</h1>
            <h2>
                <span :class="{'item__price--del': info.sale !== undefined}">
                    {{ getPrice }}
                </span>
                <span class="item__price--sale" v-if="(info.sale !== undefined)">
                    {{ getSale }}
                </span>
            </h2>
            <h2 class="item__soldout" v-if="(info.remain === 0)">{{ i18n.getLang("message.item.sold_out") }}</h2>
            <ItemSelect v-if="info.remain !== 0" :max="info.remain" ref="itemSelectRef"/>
            <div class="item__add_cart" @click="addCart()">{{ i18n.getLang("item.add_cart") }}</div>
            <hr/>
            <div class="item__desc" v-html="info.desc"></div>
        </div>
    </div>

    <Footer/>
</template>

<style scoped>
    hr {
        border: 0;
        border-bottom: 2px solid gray;
    }

    .main {
        background: #fff;
        border-radius: 20px;
        align-items: flex-start;
        display: flex;
        justify-content: space-between;
        margin: 40px auto;
        min-height: 800px;
        padding: 50px 5%;
        width: 75%;
    }

    .item__img {
        border: 1px solid lightgray;
        width: 30%;
    }

    .item__info {
        width: 60%;
    }
    
    .item__price--del {
        text-decoration: line-through;
    }
    .item__price--sale {
        color: red;
        margin-left: 10px;
    }

    .item__soldout {
        color: red;
        font-style: italic;
    }

    .item__desc {
        margin: 20px;
    }

    .item__add_cart {
        background: #fff;
        border: 2px solid #f77;
        border-radius: 15px;
        font-weight: bold;
        color: #f00;
        cursor: pointer;
        padding: 10px 30px;
        margin: 20px 0;
        width: fit-content;
        transition: all .2s;
    }
    .item__add_cart:hover {
        background: #f77;
        color: #fff;
    }
</style>
