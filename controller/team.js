/**
 * @description: 创建小组的逻辑
 */
let createTeam = async (ctx)=>{
    let {teamName,gitAddr,project_id} = ctx.request.query;
    if(!/\.git$/.test(gitAddr)){
        res.json({
            code:0,
            results:"git address format error"
        })
        return
    }
    let now = Date.now()
    let team_id = ctx.createid('team')
    let [err,results] =await ctx.mysql(`insert into teams (team_name,team_gitadress,project_id,team_id) values ('${teamName}','${gitAddr}','${project_id}','${team_id}');`)
        ctx.body = {
            code:err?0:1,
            results:err||results
        }
    
}
let updateTeam = async (ctx)=>{
    let {teamName,gitAddr,team_id} = ctx.request.body;
    if(!/\.git$/.test(gitAddr)){
        ctx.body = {
            code:0,
            results:"git address format error"
        }
        return
    }
    
    let [err,results] =await ctx.mysql(`update teams set team_name='${teamName}',team_gitadress='${gitAddr}' where team_id='${team_id}'`)
        ctx.body = {
            code:err?0:1,
            results:err || results
        }
    
}
let deleteTeam = async (ctx)=>{
    let {team_id} = ctx.request.query;
    let [err,results] =await ctx.mysql(`delete from teams where team_id='${team_id}'`)
    ctx.body = {
        code:err?0:1,
        results:err || results&&results.affectedRows==1?'success':"failed"
    }
}

/**
 * @description: 获取小组列表
 */
let teamlist = async (ctx)=>{
    let {pid} = ctx.request.query
    
    pid = pid+''
    let [err,results] = await ctx.mysql(`select * from teams where project_id='${pid}'`)
    
    ctx.body = {
        code:err?0:1,
        results:err?err:results
    }
}


module.exports = {
    'GET /createTeam': createTeam,
    'GET /teamlist': teamlist,
    'GET /deleteTeam': deleteTeam,
    'POST /updateTeam': updateTeam,
}