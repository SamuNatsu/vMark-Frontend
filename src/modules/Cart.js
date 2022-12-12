import lStorage from "./lStorage"

const add = (info)=>{
    let c = lStorage.get("cart").data || [];
    let f = false;
    c.forEach((v, i)=>{
        if (f)
            return;
        if (v.iid === info.iid) {
            f = true;
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

const del = (info)=>{
    let c = lStorage.get("cart").data || [];
    let f = false, d = false;
    c.forEach((v, i)=>{
        if (f)
            return;
        if (v.iid === info.iid) {
            f = true;
            c[i].count -= info.count;
            if (c[i].count <= 0)
                d = i;
            return;
        }
    });
    if (d !== false)
        c = c.slice(0, d).concat(c.slice(d + 1))
    lStorage.set("cart", {data: c});
}

const get = ()=>lStorage.get("cart").data

const set = (iid, data)=>{
    let c = lStorage.get("cart").data || [];
    c.forEach((v, i, a)=>{
        if (v.iid === iid)
            Object.keys(data).forEach((k)=>{
                a[i][k] = data[k]
            })
    })
    lStorage.set("cart", {data: c});
}

export const cart={add, del, get, set};
