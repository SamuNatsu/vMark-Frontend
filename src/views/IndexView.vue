<script setup>
import { storeToRefs } from "pinia";

// Stores
import { useSkinStore } from "../stores/Skin.js";

// Components
import Topbar from "../components/Topbar.vue";
import Header from "../components/Header.vue";
import Categorybar from "../components/Categorybar.vue";

// Skin store
const skin = useSkinStore();
await skin.init();
const { title } = skin;
const { header } = storeToRefs(skin);

// Set title
document.querySelector("title").innerHTML = title.index || "vMark";
</script>

<template>
	<Topbar />
	<Header 
		:main-style="header.mainStyle"
		:title-style="header.titleStyle"
		:title-inner-html="header.titleInnerHtml"
	/>
	<Categorybar />
</template>

<style scoped>
</style>
