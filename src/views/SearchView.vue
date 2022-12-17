<script setup>

import Topbar from "../components/Topbar.vue";
import Header from "../components/Header.vue";
import Categorybar from "../components/Categorybar.vue";
import ItemShowcase from "../components/ItemShowcase.vue";
import Footer from "../components/Footer.vue"

document.querySelector("title").innerHTML = "Search - vMark";
</script>

<template>
    <Topbar />
	<Header />
	<Categorybar />
	<ItemShowcase />
	<Footer />
</template>
