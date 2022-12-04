<script setup>
import { storeToRefs } from "pinia";

// Stores
import { useSkinStore } from "../pinia/Skin";

// Components
import Topbar from "../components/Topbar.vue";
import Header from "../components/Header.vue";
import Categorybar from "../components/Categorybar.vue";
import ItemShowcase from "../components/ItemShowcase.vue";
import Footer from "../components/Footer.vue"

// Skin store
const skin = useSkinStore();
await skin.init();
const { title } = storeToRefs(skin);

// Set title
document.querySelector("title").innerHTML = title.value.index || "vMark";
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
