/* localStorage.js v0.0.1 */

const lStorage = {
    get: (key)=>JSON.parse(window.localStorage.getItem(key) || "{}"),
    set: (key, obj)=>window.localStorage.setItem(key, JSON.stringify(obj))
};

export default lStorage;
