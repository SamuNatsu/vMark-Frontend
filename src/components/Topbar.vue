<script setup>
import { PiniaStore } from "../store";

const lang = PiniaStore().i18n;

</script>

<template>
	<div class="topbar">
		<div class="topbar__welcome">{{ lang.topbar.welcomeFormat.format("A") }}</div>
		<div class="topbar__vr"></div>
		<div class="topbar__btn"><RouterLink to="user">{{ lang.topbar.center }}</RouterLink></div>
		<div class="topbar__btn"><RouterLink to="admin">{{ lang.topbar.admin }}</RouterLink></div>
		<div class="topbar__btn"><RouterLink to="login">{{ lang.topbar.login }}</RouterLink></div>
		<div class="topbar__btn"><RouterLink to="register">{{ lang.topbar.register }}</RouterLink></div>
	</div>
</template>

<style scoped>
	a {
		color: inherit;
		text-decoration: none;
	}
	.topbar {
		box-shadow: lightgray 0 1px 5px;
		color: gray;
		display: flex;
		font-size: .7em;
		justify-content: flex-end;
	}
	.topbar>div {
		margin: 10px 20px;
	}
	.topbar__welcome {
		font-style: italic;
	}
	.topbar__vr {
		border-left: 1px solid lightgray;
		margin: 0 !important;
	}
	.topbar__btn:hover {
		color: red;
	}
</style>
