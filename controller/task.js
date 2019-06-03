
const createTask = async (ctx)=>{
    let {task_name,member_id,team_id,project_id,sid} = ctx.request.body;

    let [err, results] = await ctx.mysql(`insert into tasks (task_name,member_id,team_id,project_id,sid)
     values ('${task_name}','${member_id}','${team_id}','${project_id}','${sid}')`)
    ctx.body = ({
        code:err?0:1,
        results: err||results
    })
}
const changeTask = async (ctx)=>{
    let {task_name,tid} = ctx.request.body;

    let [err, results] = await ctx.mysql(`update tasks set task_name='${task_name}' where tid='${tid}'`)
    ctx.body = ({
        code:err?0:1,
        results: err||results
    })
}
const deleteTask = async (ctx)=>{
    let {tid,member_id} = ctx.request.query;

    let [err, results] = await ctx.mysql(`delete from tasks where tid='${tid}' and member_id='${member_id}'`)
    ctx.body = ({
        code:err?0:1,
        results: err||(results&&results.affectedRows==1?'success':"数据不存在")
    })
}
const tasksList = async (ctx)=>{
    let {member_id} = ctx.request.query;
    let [err,results] = await ctx.mysql(`select * from tasks where member_id='${member_id}'`)
    ctx.body = ({
        code:err?0:1,
        results: err||results
    })
}
const memberTaskList = async (ctx)=>{
    let {sid,error} = ctx.authCheck();

    let [err,results] = await ctx.mysql(`select * from tasks where sid='${sid}'`)
    ctx.body = ({
        code:err?0:1,
        results: err||results
    })
}
const teamTaskList = async (ctx)=>{
    let {team_id, member_id} = ctx.request.query;

    let [err0,results0] = await ctx.mysql(`select * from members where member_id='${member_id}'`)
    if(results0 && [0,1].includes(results0[0].identity*1)){
        let [err,results] = await ctx.mysql(`select * from tasks where team_id='${team_id}'`)
        ctx.body = ({
            code:err?0:1,
            results: err||results
        })
    }else{
        ctx.body = ({
            code:err0?0:1,
            results: err0||'身份权限不足'
        })
    }
}
const taskStatus = async (ctx)=>{
    let {tid,status} = ctx.request.query;
    let arr = [0,1,2];
    if(!arr.includes(status*1)){
        ctx.body = ({
            code:0,
            results:'status should be one of [0,1,2]'
        })
        return
    }
    let [err,results] = await ctx.mysql(`update tasks set task_status='${status}' where tid='${tid}'`)
    ctx.body = ({
        code:err?0:1,
        results: err||results
    })
}

const taskCheck = async (ctx)=>{
    let {tid,checkPerson} = ctx.request.query;
    let [error,[result]] = await ctx.mysql(`select * from members where member_id='${checkPerson}'`)
    if(!result){
        ctx.body = ({
            code:0,
            result:"数据不存在"
        })
        return
    }
    let arr=[0,1]
    if(!arr.includes(result.identity*1)){
        ctx.body = ({
            code:1,
            result:"权限不足"
        })
        return
    }
    let [err,results] = await ctx.mysql(`update tasks set task_checked=1,check_person='${checkPerson}' where tid='${tid}'`)
    ctx.body = ({
        code:err?0:1,
        results: err||results
    })
}

module.exports = {
    'POST /createTask':createTask,
    'GET /tasksList':tasksList,
    'GET /teamTaskList':teamTaskList,
    'GET /taskStatus':taskStatus,
    'GET /taskCheck':taskCheck,
    'GET /deleteTask':deleteTask,
    'POST /changeTask':changeTask,
    'GET /memberTaskList':memberTaskList,
}