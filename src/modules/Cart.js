import lStorage from "./lStorage"

const add = (info)=>{
    let c = lStorage.get("cart").data || [];
    let f = false;
    c.forEach((v, i)=>{
        if (f)
            return;
        if (v.iid === info.iid) {
            f = true;
            c[i].price = info.price;
            c[i].count += info.count;
            return;
        }
    });
    if (f === false)
        c.push({
            iid: info.iid,
            count: info.count
        });
    lStorage.set("cart", {data: c});
}

const get = ()=>lStorage.get("cart").data

export const cart={add, get};
