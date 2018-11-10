const {mysql} = require('../qcloud');

module.exports = async (ctx)=>{
    let {id} = ctx.request.query;

    let bookInfo = await mysql('books')
                        .select('books.*','cSessionInfo.user_info')
                        .join('cSessionInfo','books.openid','cSessionInfo.open_id')
                        .where('books.id',id)
                        .first();
    const info = JSON.parse(bookInfo.user_info);                        
    ctx.state.data = {
        list:Object.assign({},bookInfo,{
            tags: bookInfo.tags.split(','),
            summary: bookInfo.summary.split('\n'),
            user_info: {
                name: info.nickName,
                image: info.avatarUrl
            }
        })
    }                    

    await mysql('books')
            .where('id',id)
            .increment('count',1)
}

