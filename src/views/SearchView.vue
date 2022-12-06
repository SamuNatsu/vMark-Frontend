<script setup>
import { storeToRefs } from "pinia";

import stores from "../pinia"

import Topbar from "../components/Topbar.vue";
import Header from "../components/Header.vue";
import Categorybar from "../components/Categorybar.vue";
import ItemShowcase from "../components/ItemShowcase.vue";
import Footer from "../components/Footer.vue"

const skin = stores.skin;
const { title } = storeToRefs(skin);

document.querySelector("title").innerHTML = title.value.search || "Search - vMark";
</script>

<template>
    <Topbar />
	<Header />
	<Categorybar />
	<ItemShowcase />
	<Footer />
</template>
