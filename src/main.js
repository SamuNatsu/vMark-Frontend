import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

String.prototype.format = function() {
	let str = this;
	for (let i = 0; i < arguments.length; ++i)
		str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
	return str;
};

createApp(App)
	.use(router)
	.use(pinia)
	.mount("#app");
