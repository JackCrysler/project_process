
const jwt = require('jsonwebtoken')
const utils = require('../utils')
const svgCaptcha = require('svg-captcha')
//redis
let count =0
let sessionCache = {}
let captcha = async (ctx)=>{
    let {data,text} = svgCaptcha.create({
        size:4,
        ignoreChars: '0o1il',
        noise: 3,
        background: '#cc9966',
    })
    
    text = text.toLocaleLowerCase()
    data = data.replace('width="150"','').replace('height="50"','')
    sessionCache[text] = ++count
    ctx.cookies.set('count',count,{
        path:'/login',   //cookie写入的路径
        httpOnly:false,
        overwrite:false
    })
    ctx.body={
        code:1,
        data,
    }
}

let register = async (ctx) => {

    let { user_name, user_pwd } = ctx.request.body
    
    let valideErr = await ctx.validate({
        user_name: 'string',
        user_pwd: 'string'
    }, ctx.request.body)
    if(valideErr.length>0){
        ctx.body = {
            code: 0,
            results: valideErr
        }
        return
    }
    let cipheredPwd = utils.cipher(user_pwd)
    let uid = ctx.createid()
    
    let [error,results] = await ctx.mysql(`insert into students (user_name, user_pwd, sid, phone) values ('${user_name}','${cipheredPwd}','${uid}', '${13333333333}')`)
    
    ctx.body = {
        code: error?0:1,
        results: error || results
    }
}

let login = async (ctx, next) => {
    let error = await ctx.validate({
        user_name: 'string',
        user_pwd: 'string',
        // captcha:"string"
    }, ctx.request.body)
    if(error.length>0){
        ctx.body={
            code:0,
            msg:error
        }
        return
    }
    let count = ctx.cookies.get('count')
    let { user_name, user_pwd, captcha } = ctx.request.body
    let { identify } = ctx.request.query
    if(!user_name||!user_pwd){
        ctx.body={
            code:0,
            msg:"信息不全"
        }
        return
    }
    let cipheredPwd = utils.cipher(user_pwd)
    
    //是否开启验证码
    // if(sessionCache[captcha] != count){
    //     ctx.body={
    //         code:0,
    //         message:"验证码错误"
    //     }
    //     return 
    // }
    let [err, results] = await ctx.mysql(`select * from students where user_name='${user_name}' and user_pwd='${cipheredPwd}'`)
    if(err){
        ctx.status = 500
        ctx.body={
            code:0,
            msg:err
        }
        return
    }
    if(results.length>0){
        let {sid,user_name} = results[0]
        let token = jwt.sign({sid,user_name}, 'jack')
        ctx.response.body = {
            code: 1,
            token,
            msg: "success"
        }
    }else{
        ctx.body={
            code:0,
            msg:"密码错误，或者未注册"
        }
    }
}


module.exports = {
    'POST /register': register,
    'POST /login': login,
    'GET /captcha': captcha,
}