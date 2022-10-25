/* localStorage.js v0.0.1 */

const localStorageGet = (key)=>JSON.parse(window.localStorage.getItem(key) ?? "{}");

const localStorageSet = (key, obj)=>window.localStorage.setItem(key, JSON.stringify(obj));

export { localStorageGet, localStorageSet };
