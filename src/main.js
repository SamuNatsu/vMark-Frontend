import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/router";
import pinia from "./pinia/pinia"

import "./assets/main.css";

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
