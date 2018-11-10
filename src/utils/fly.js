import conf from './config'
import helper from './helper'

var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly

//请求配置
const config = {
    timeout:conf.timeout,
    baseURL:conf.url,
    parseJson:true
}
fly.config = config

//请求拦截
fly.interceptors.request.use((request)=>{
    if(!request.body || !request.body.withoutLoading){
        helper.showLoading();
    }
    if(request.body&&request.body.contentType){
        request.headers['Content-Type'] = request.body.contentType
    }
    return request;
})

//响应拦截
fly.interceptors.response.use((res)=>{
    helper.hideLoading();
    if(res.status === 200 && res.data.code === 0){
        return res.data;
    }else{
        helper.showModal('失败',res.data.data.msg);
    }
},(err)=>{
    helper.showToast('服务出现故障','none');
})


export default  {ajax:fly}

