const {mysql} = require('../qcloud');

module.exports = async(ctx)=>{
    let {bookid,openid,comment,location,phone} = ctx.request.body;
    await mysql('comments').insert({bookid,openid,comment,location,phone});
    try{
        ctx.state = {
            code:0,
            data:{
                msg:'success'
            }
        }
    }catch(e){
        ctx.state = {
            code:-1,
            data:{
                msg:'评论失败:'+e.sqlMessage
            }
        }
    }
}