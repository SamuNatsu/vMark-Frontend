<script setup>
import Topbar from "../components/Topbar.vue";
import Header from "../components/Header.vue";
import Categorybar from "../components/Categorybar.vue";

const header = {
	title: "<span style=\"color:red\">v</span><span>Mark</span>",
	style: "font-size: 4em; font-weight: bold"
};

</script>

<template>
	<Topbar/>
	<Header :header="header"/>
	<Categorybar/>
</template>

<style scoped>
</style>
