import axios from "axios";
import { defineStore } from "pinia";

// Convert price
const convert = (price)=>{
	if (price < 100) {
		let str = "" + price;
		while (str.length < 2)
			str = "0" + str;
		return "0." + str;
	}

	let str = "" + price;
	let dec = str.substring(str.length - 2);
	str = str.substring(0, str.length - 2);
	let arr = [];
	for (let i = str.length; i > 0; i -= 3)
		arr.push(str.substring(Math.max(0, i - 3), i));
	return arr.reverse().join(",") + "." + dec;
};

// Export store
export const useItemStore = defineStore("item", {
    state: ()=>({
		initialize: false,
		category: [
			{
				name: "XXXXX",
				sub: [
					{name: "XXXXX"},
					{name: "XXXXX"},
					{name: "XXXXX"}
				]
			},
			{name: "XXXXX"},
			{name: "XXXXX"}
		],
		items: [
			{
				name: "XXXXX",
				price: 0
			},
			{
				name: "XXXXX",
				price: 0
			},
			{
				name: "XXXXX",
				price: 0
			},
			{
				name: "XXXXX",
				price: 0
			}
		],
		pageNav: {
			total: 999,
			current: 1,
			next: "#"
		}
    }),
	getters: {
		getCategoryLink: ()=>((cid)=>(typeof cid) === "number" ? `/search?cid=${cid}` : "#"),
		getItemLink: ()=>((iid)=>(typeof iid) === "number" ? `/item?iid=${iid}` : "#"),
		getPrice: ()=>((item)=>{
			if (item.sale === undefined)
				return convert(item.price);
			else 
				return `<del style="color:gray">${convert(item.price)}</del> <span style="color:red">${convert(item.sale)}</span>`;
		}),
		getMainPic: ()=>((item)=>item.aid === undefined ? null : vMarkBackendAPI + "api/attachment/get?aid=" + item.aid)
	},
	actions: {
		init: async function() {
			let ret = (await axios.get(vMarkBackendAPI + "api/category/")).data;
			this.category = ret.data.filter((value)=>value.parent === undefined);
			let children = ret.data.filter((value)=>value.parent !== undefined);
			children.forEach((v1)=>{
				this.category.forEach((v2)=>{
					if (v2.cid === v1.parent) {
						if (v2.sub === undefined)
							v2.sub = [v1];
						else 
							v2.sub.push(v1);
					}
				});
			});

			this.initialize = true;
		},
		update: async function(data) {
			if (this.initialize === false)
				await this.init();

			let qstr = "";
			Object.keys(data).forEach((k)=>{
				if (qstr.length !== 0)
					qstr += '&';
				qstr += encodeURI(k) + '=' + encodeURI(data[k])
			})
			let ret = (await axios.get(vMarkBackendAPI + "api/item/?" + qstr)).data;
			this.items = ret.data;
		}
	}
});
