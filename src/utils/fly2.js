import conf from './config'
import helper from './helper'


let Fly=require("flyio/dist/npm/wx") 
let fly=new Fly
let newFly = new Fly
let token = '666'


//请求配置
const config = {
    timeout:conf.timeout,
    baseURL:conf.url,
    parseJson:true
}
fly.config = config
newFly.config = config

//请求拦截
fly.interceptors.request.use(function(request){
    if(!request.body || !request.body.withoutLoading){
        helper.showLoading();
    }
    if(request.body&&request.body.contentType){
        request.headers['Content-Type'] = request.body.contentType
    }
    return request;
    //拦截中发送请求
    // if(!token){
    //     fly.lock();
    //     return newFly.get('/weapp/getToken').then(function(res){
    //         request.body['token'] = token = res.data.data.token;
    //         fly.unlock();
    //         return request;
    //     })
    // }else{
    //     request.body['token'] = token
    // }
})


//响应拦截
fly.interceptors.response.use(function(res){
    if(res.status === 200 && res.data.code === 0){
        return res.data;
    }else{
        helper.showModal('失败',res.data.data.msg);
    }
    // let currentReq = res.request;
    // if(res.data.data.code == -1){
    //     fly.lock();
    //     return newFly.get('/weapp/getToken').then(function(res){
    //         token = res.data.data.token;
    //         fly.unlock();  
    //     }).then(function(){
    //         return fly.request(currentReq)
    //     })
    // }else{
    //     return res.data
    // }
},(err)=>{
    helper.showToast('服务出现故障','none');
})


export default{
    ajax:fly
}
