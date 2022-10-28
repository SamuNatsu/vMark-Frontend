import { defineStore } from "pinia";
import { ajaxGet } from "../modules/ajax.js";

// Convert price
const convert = (price)=>{
	let str = "" + Math.round(price * 100) / 100;
	let pos = str.indexOf(".");

	if (pos === -1)
		str += ".00";
	else if (pos === str.length - 2)
		str += "0";

	pos = str.indexOf(".");
	let arr = [];
	let ts = str.substring(0, pos);
	for (let i = ts.length; i > 0; i -= 3)
		arr.push(ts.substring(Math.max(0, i - 3), i));
	return arr.reverse().join(",") + str.substring(pos);
};

// Export store
export const useItemStore = defineStore("item", {
    state: ()=>({
		category: [
			{
				name: "Cate 1",
				cid: 1,
				sub: [
					{
						name: "Cate 1-1",
						cid: 2
					},
					{
						name: "Cate 1-2",
						cid: 3
					}
				]
			}
		],
		items: [
			{
				name: "Item 1",
				iid: 1,
				price: 114514.2,
				sale: 810
			},
			{
				name: "Item 1",
				iid: 1,
				price: 114514,
				sale: 810
			},
			{
				name: "Item 1",
				iid: 1,
				price: 114514,
				sale: 810
			},
			{
				name: "Item 1",
				iid: 1,
				price: 114514,
				sale: 810
			},
			{
				name: "Item 1",
				iid: 1,
				price: 114514,
				sale: 810
			},
			{
				name: "Item 1",
				iid: 1,
				price: 114514,
				sale: 810
			},
			{
				name: "Item 1",
				iid: 1,
				price: 114514,
				sale: 810
			}
		]
    }),
	getters: {
		getCategoryLink: (state)=>((cid)=>`/search?category=${cid}`),
		getItemLink: (state)=>((iid)=>`/item/${iid}`),
		getPrice: (state)=>((item)=>{
			if (item.sale === undefined)
				return convert(item.price);
			else 
				return `<del style="color:gray">${convert(item.price)}</del> <span style="color:red">${convert(item.sale)}</span>`;
		})
	},
	actions: {
		init: async ()=>{}
	}
});
