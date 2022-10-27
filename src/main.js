import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// Create pinia instance
const pinia = createPinia();

// String format prototype function
String.prototype.format = function() {
	let str = this;
	for (let i = 0; i < arguments.length; ++i)
		str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
	return str;
};

// Create application
createApp(App)
	// User plugins
	.use(router)
	.use(pinia)
	// Mout application
	.mount("#app");
