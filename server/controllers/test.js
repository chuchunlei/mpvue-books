module.exports = async(ctx)=>{
    
    // let {token} = ctx.request
    let param = ctx.request.headers.token

    let res = {
        type:1,
        data:{
            msg:'token ok',
            code:1
        },
        param
    }
    ctx.body = JSON.stringify(res)

}