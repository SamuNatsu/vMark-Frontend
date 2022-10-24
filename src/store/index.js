import { defineStore } from "pinia";

import { createI18N } from "../modules/i18n.js";

const lang = await createI18N("zh_CN");

export const PiniaStore = defineStore("main", {
	state: ()=>{
		return {
			i18n: lang
		};
	}
});
