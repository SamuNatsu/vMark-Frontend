import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/router";
import { registerStore } from "./pinia";

import "./assets/main.css";
import axios from "axios";

String.prototype.format = function() {
	let str = this;
	for (let i = 0; i < arguments.length; ++i)
		str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
	return str;
}

axios.defaults.withCredentials = true

const app = createApp(App)

app.use(router)
app.use(createPinia())

registerStore()

app.mount("#app")
