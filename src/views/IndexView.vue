<script setup>
import { storeToRefs } from "pinia";

// Stores
import { useSkinStore } from "../stores/Skin.js";

// Components
import Topbar from "../components/Topbar.vue";
import Header from "../components/Header.vue";
import Categorybar from "../components/Categorybar.vue";
import ItemShowcase from "../components/ItemShowcase.vue";

// Skin store
const skin = useSkinStore();
await skin.init();
const { title } = skin;

// Set title
document.querySelector("title").innerHTML = title.index || "vMark";
</script>

<template>
	<Topbar />
	<Header />
	<Categorybar />
	<ItemShowcase />
</template>

<style scoped>
</style>
