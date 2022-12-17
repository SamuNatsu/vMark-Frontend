<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

import stores from "../pinia";

import Dropdown from "./Dropdown.vue";

const router = useRouter();

const i18n = stores.i18n;
const user = stores.user;

const dropdownButton = computed(()=>{
	let imgEl = '<img src="/svg/language.svg" style="margin-right: 10px; height:calc(.7em + 20px)"/>';
	let textEl = `<div>${i18n.getCurrentName}</div>`;
	return imgEl + textEl;
});
const dropdownList = computed(()=>
	i18n.getIndexValues.map(
		(value)=>({innerHtml: value})
	)
);
const dropdownAction = (item, id)=>i18n.switchLang(i18n.getIndexKeys[id]);

const logout = ()=>{
	user.logout();
	router.push({name: "index"});
};
</script>

<template>
	<!-- Container -->
	<div class="topbar">
		<!-- Welcome message (Login only) -->
		<div v-if="user.isLogined" class="topbar__welcome">
			{{ i18n.getLang("topbar.welcome").format(user.getName || user.getAccount) }}
		</div>

		<div v-if="user.isLogined" class="topbar__vr"></div>

		<div v-if="user.isLogined" class="topbar__btn">
			<RouterLink to="cart">{{ i18n.getLang("topbar.cart") }}</RouterLink>
		</div>

		<!-- User center entry (Login only) -->
		<div c class="topbar__btn">
			<RouterLink to="user">{{ i18n.getLang("topbar.center") }}</RouterLink>
		</div>

		<!-- Admin center entry (Login only, admin only) -->
		<div v-if="user.isLogined && user.isAdmin" class="topbar__btn">
			<RouterLink to="admin">{{ i18n.getLang("topbar.admin") }}</RouterLink>
		</div>

		<!-- Logout (Login only) -->
		<div v-if="user.isLogined" class="topbar__btn">
			<a href="#" @click="logout()">{{ i18n.getLang("topbar.logout") }}</a>
		</div>

		<!-- Login entry (No login only) -->
		<div v-if="!user.isLogined" class="topbar__btn">
			<RouterLink to="login">{{ i18n.getLang("topbar.login") }}</RouterLink>
		</div>

		<!-- Register entry (No login only) -->
		<div v-if="!user.isLogined" class="topbar__btn">
			<RouterLink to="register">{{ i18n.getLang("topbar.register") }}</RouterLink>
		</div>

		<div class="topbar__vr"></div>

		<!-- Language selection -->
		<Dropdown 
			main-style="margin: 0; min-width: 100px; text-align: center"
			button-style="align-items: center; display: flex; height: 100%; justify-content: center; padding: 0 20px"
			list-style="right: 0; width: 100%"
			item-default-style="padding: 10px 20px"
			:button-inner-html="dropdownButton"
			:list="dropdownList"
			:item-default-action="dropdownAction"
		/>
	</div>
</template>

<style scoped>
	a {
		color: inherit;
		text-decoration: none;
	}

	.topbar {
		background: #fff;
		box-shadow: lightgray 0 1px 5px;
		color: gray;
		display: flex;
		font-size: .7em;
		justify-content: flex-end;
		position: relative;
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
