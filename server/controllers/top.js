const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
    let tops = await mysql('books')
                        .select()
                        .orderBy('count','desc')
                        .limit(9);

    ctx.state = {
        code:0,
        data:tops
    }                        
}