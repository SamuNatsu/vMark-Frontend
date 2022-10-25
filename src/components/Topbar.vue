<script setup>
import { storeToRefs } from "pinia";
import { useI18N } from "../stores/I18N.js";
import { useUser } from "../stores/User.js";

// Components
import Dropdown from "./Dropdown.vue";

// I18N store
const I18N = useI18N();
const { index, current, lang } = storeToRefs(I18N);

// User store
const User = useUser();
const { login, account } = storeToRefs(User);

// Language dropdown menu properties
const dropdownStyle = {
	container: "margin: 0; min-width: 100px; text-align: center",
	button: "padding: 10px 20px",
	list: "min-width: 100px; right: 0",
	item: "padding: 10px 20px"
};
const dropdownAction = (item, id)=>{
	I18N.switchLang(Object.keys(index.value)[id]);
};
</script>

<template>
	<div class="topbar">
		<div class="topbar__welcome" v-if="login">{{ lang.topbar.welcomeFormat.format(account) }}</div>
		<div class="topbar__vr" v-if="login"></div>
		<div class="topbar__btn" v-if="login"><RouterLink to="user">{{ lang.topbar.center }}</RouterLink></div>
		<div class="topbar__btn" v-if="login"><RouterLink to="admin">{{ lang.topbar.admin }}</RouterLink></div>

		<div class="topbar__btn" v-if="!login"><RouterLink to="login">{{ lang.topbar.login }}</RouterLink></div>
		<div class="topbar__btn" v-if="!login"><RouterLink to="register">{{ lang.topbar.register }}</RouterLink></div>

		<div class="topbar__vr"></div>
		<Dropdown 
			:name="index[current]" 
			:list="Object.values(index)" 
			:style="dropdownStyle" 
			:action="dropdownAction"
		/>
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
