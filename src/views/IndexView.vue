<script setup>
import { storeToRefs } from "pinia";

import stores from "../pinia"

import Topbar from "../components/Topbar.vue";
import Header from "../components/Header.vue";
import Categorybar from "../components/Categorybar.vue";
import ItemShowcase from "../components/ItemShowcase.vue";
import Footer from "../components/Footer.vue"
import { watch } from "vue";

const skin = stores.skin
const { sitename } = storeToRefs(skin)

watch(sitename, ()=>{
	document.querySelector("title").innerHTML = (sitename.value || "vMark")
})
document.querySelector("title").innerHTML = (sitename.value || "vMark")

</script>

<template>
	<Topbar />
	<Header />
	<Categorybar />
	<ItemShowcase />
	<Footer />
</template>

<style scoped>
</style>
