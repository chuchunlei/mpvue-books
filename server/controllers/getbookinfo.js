const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{

    let {page,num} = ctx.request.query;

    const bookinfo = await mysql('books')
                        .select('books.*','cSessionInfo.user_info')
                        .join('cSessionInfo','books.openid','cSessionInfo.open_id')
                        .orderBy('books.id','desc')
                        .limit(Number(num))
                        .offset(page*num)
                                    
    ctx.state = {
        code :0,
        data:bookinfo.map((item)=>{
            let info = JSON.parse(item.user_info);        
            return Object.assign({},item,{
                user_info:{
                    nickName:info.nickName
                }
            })
        })
    }
}