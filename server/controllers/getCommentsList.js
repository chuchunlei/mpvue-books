const {mysql} = require('../qcloud');

module.exports = async(ctx)=>{
    let {bookid,openid} = ctx.request.query;
    let commentSelect =  mysql('comments')
                        .select('comments.*','cSessionInfo.user_info')
                        .join('cSessionInfo','comments.openid','cSessionInfo.open_id')
                            
    let commentsList;
    if(bookid){
        commentsList = await commentSelect.where('bookid',bookid)
    }
    if(openid){
        commentsList = await commentSelect.where('openid',openid)
    }                            
                            
    ctx.state = {
        code:0,
        data:{
            list:commentsList.map((comment)=>{
                const info = JSON.parse(comment.user_info);
                return Object.assign({},comment,{
                    user_info:{
                        nickName:info.nickName,
                        avatarUrl:info.avatarUrl
                    }
                })
            })
        }
    }                            
}