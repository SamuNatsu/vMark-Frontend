/* ajax.js v0.0.1 */

// Make query string
const mkQryStr = (obj)=>{
	if (obj === undefined)
		return "";

	if ((typeof obj) !== "object")
		throw "Not an object";

	let str = "";
	Object.keys(obj).forEach((value, index)=>{
		if (index > 0)
			str += "&";
		if ((typeof obj[value]) !== "string")
			throw "Not a query object";
		str += encodeURI(value) + "=" + encodeURI(obj[value]);
	});

	return str;
};

// State change hook
const stateChangeHook = (xhr, resolve, reject)=>{
	if (xhr.readyState === 4) {
		if (xhr.status >= 200 && xhr.status < 300)
			resolve(xhr.response);
		else 
			reject(xhr.status);
	}
};

// Get method
const ajaxGet = (url, data)=>{
	return new Promise((resolve, reject)=>{
		let qstr = mkQryStr(data);
		let xhr = new XMLHttpRequest();
		xhr.open("GET", url + (qstr === "" ? "" : "?" + qstr), true);
		xhr.onreadystatechange = ()=>stateChangeHook(xhr, resolve, reject);
		xhr.send();
	});
};

// Post method
const ajaxPost = (url, data)=>{
	return new Promise((resolve, reject)=>{
		let qstr = mkQryStr(data);
		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = ()=>stateChangeHook(xhr, resolve, reject);
		xhr.send(qstr);
	});
};

// Export
export { ajaxGet, ajaxPost };
