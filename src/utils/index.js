import fly from './fly'

//get
export const get = (url,data)=>{
    data = data || {}
    return fly.ajax.get(url,data)
}

//post
export const post = (url,data)=>{
    data = data || {}
    return fly.ajax.post(url,data)
}

//formData
export const formData = (url,data)=>{
    data = data || {}
    let formData = new FormData();
    Object.keys(data).forEach((item)=>{
        formData.append(item,data[item]);
    });
    return fly.ajax.post(url,formData);
}
