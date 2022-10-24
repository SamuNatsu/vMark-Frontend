/* i18n.js v0.0.1 */
import { ajaxGet } from "./ajax.js";

export const createI18N = async (defaultLang)=>{
	let lang = (navigator.systemLanguage || navigator.language).replace("-", "_");

	try {
		let data = await ajaxGet(window.location.protocol + "/i18n/" + lang + ".json");
		return JSON.parse(data);
	} catch (e) {
		let data = await ajaxGet(window.location.protocol + "/i18n/" + defaultLang + ".json");
		return JSON.parse(data);
	}
};
