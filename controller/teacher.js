
const jwt = require('jsonwebtoken')
const utils = require('../utils')
let registerTeacher = async (ctx) => {

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
    let uid = ctx.createid('teacher')
    
    let [error,results] = await ctx.mysql(`insert into teachers (teacher_name, teacher_pwd, tid) values ('${user_name}','${cipheredPwd}','${uid}')`)
    
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
    let { user_name, user_pwd } = ctx.request.body
    if(!user_name||!user_pwd){
        ctx.body={
            code:0,
            msg:"信息不全"
        }
        return
    }
    let cipheredPwd = utils.cipher(user_pwd);

    let [err, results] = await ctx.mysql(`select * from teachers where teacher_name='${user_name}' and teacher_pwd='${cipheredPwd}'`)

    if(err){
        ctx.status = 500
        ctx.body={
            code:0,
            msg:err
        }
        return
    }
    
    if(results.length>0){
        let token = jwt.sign({user_name,create_time:Date.now(),tid:results[0].tid}, 'jack')
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

let teacherInfo = async (ctx)=>{
    let {teacher} = ctx.query
    let [err, results] = await ctx.mysql(`select * from teachers where teacher_name='${teacher}'`)
    if(err){
        ctx.status = 500
        ctx.body={
            code:0,
            msg:err
        }
        return
    }
    
    if(results.length>0){
        ctx.response.body = {
            code: 1,
            tid: results[0].tid,
            msg: "success"
        }
    }else{
        ctx.body={
            code:0,
            msg:"无信息"
        }
    }
}


module.exports = {
    'POST /register/teacher': registerTeacher,
    'POST /login/teacher': login,
    'GET /info/teacher': teacherInfo,
}