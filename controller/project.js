/*
 * @Description: Have A Nice Day! 项目相关API
 * @Author: Jacky
 * @LastEditors: Jacky
 * @Date: 2019-05-13 10:41:13
 * @LastEditTime: 2019-06-03 18:05:46
 */

/**
 * @description: 创建项目
 */
let createProject = async (ctx)=>{
    let validError = await ctx.validate({cid:'string', project_name:"string"},ctx.request.body) 
    if(validError.length>0){
        ctx.body = {
            code: 0,
            results: validError
        }
        return 
    }
    let id = ctx.createid('project')
    let {cid, project_name,project_discription} = ctx.request.body
    let [err,results] = await ctx.mysql(`insert into projects (cid, project_name, project_description, project_id) values 
    ('${cid}','${project_name}','${project_discription}','${id}')`)

    ctx.body={
        code:err?0:1,
        results:err||results
    }
}
let deleteProject = async (ctx)=>{
    let {project_id} = ctx.request.query;

    let [err,results] =await ctx.mysql(`delete from projects where project_id='${project_id}'`)
    
    ctx.body = {
        code:err?0:1,
        results:err||(results&&results.affectedRows==1?'success':"failed")
    }
}
let projectList = async (ctx)=>{
    let {cid} = ctx.request.query
    let [err,results] = await ctx.mysql(`select * from projects where cid='${cid}'`)
    ctx.body = {
        code:err?0:1,
        results:err||results
    }
}

module.exports = {
    "POST /createProject": createProject,
    "GET /projectList": projectList,
    "GET /deleteProject": deleteProject,
}