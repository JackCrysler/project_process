const jwt = require('jsonwebtoken')
const url = require('url')
module.exports = async (ctx,next)=>{
    let whitelist = [
        '/login','/register',
        '/captcha','/register/teacher','/login/teacher',
        '/info/teacher',
        '/class/list'
    ]
    let {pathname} = url.parse(ctx.url)
    if(whitelist.includes(pathname) ){
        await next()
    }else{
        
        try{
            let token = ctx.get('authorization')
            let decoded = jwt.verify(token, 'jack')
            await next()
        }catch(err){
            ctx.response.status = 401;
            console.log(err)
            ctx.body ={
                code:0,
                msg:err
            }
        }
    }
}