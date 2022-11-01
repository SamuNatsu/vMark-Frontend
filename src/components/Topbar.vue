<script setup>
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";

// Stores
import { useI18NStore } from "../stores/I18N";
import { useUserStore } from "../stores/User";

// Components
import Dropdown from "./Dropdown.vue";

// I18N store
const I18N = useI18NStore();
await I18N.init();

// User store
const user = useUserStore();
await user.init();
const { login, admin, account } = storeToRefs(user);

// Language dropdown menu properties
const dropdownButton = computed(()=>{
	let imgEl = '<img src="/svg/language.svg" style="margin-right: 10px; height:calc(.7em + 20px)"/>';
	let textEl = `<div>${I18N.getCurrentName}</div>`;
	return imgEl + textEl;
});
const dropdownList = computed(()=>I18N.getIndexValues.map((value)=>({innerHtml: value})));
const dropdownAction = (item, id)=>I18N.switchLang(I18N.getIndexKeys[id]);
</script>

<template>
	<!-- Container -->
	<div class="topbar">
		<!-- Welcome message (Login only) -->
		<div v-if="login" class="topbar__welcome">
			{{ I18N.getLang("topbar.welcome").format(account) }}
		</div>

		<div v-if="login" class="topbar__vr"></div>

		<!-- User center entry (Login only) -->
		<div v-if="login" class="topbar__btn">
			<RouterLink to="user">{{ I18N.getLang("topbar.center") }}</RouterLink>
		</div>

		<!-- Admin center entry (Login only, admin only) -->
		<div v-if="login && admin" class="topbar__btn">
			<RouterLink to="admin">{{ I18N.getLang("topbar.admin") }}</RouterLink>
		</div>

		<!-- Login entry (No login only) -->
		<div v-if="!login" class="topbar__btn">
			<RouterLink to="login">{{ I18N.getLang("topbar.login") }}</RouterLink>
		</div>

		<!-- Register entry (No login only) -->
		<div v-if="!login" class="topbar__btn">
			<RouterLink to="register">{{ I18N.getLang("topbar.register") }}</RouterLink>
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
