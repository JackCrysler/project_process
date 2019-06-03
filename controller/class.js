
let create = async ctx=>{
    let validRes = await ctx.validate({
        class_name:'string',
        class_info:'string'
    },ctx.request.body)
    if(validRes.length>0){
        ctx.body={
            code:0,
            msg: validRes
        }
        return
    }

    let {tid} = ctx.authCheck()

    let {class_name, class_info}=ctx.request.body;
    let cid = ctx.createid('class')
    let [err,res] = await ctx.mysql(`insert into classes (cid, class_name, class_info, tid) values ('${cid}','${class_name}', '${class_info}', '${tid}')`)
    ctx.body={
        code: err?0:1,
        msg: err?err:res
    }
}

let list = async ctx=>{
    let {tid} = ctx.authCheck();
    let [err,res] = []
    if(tid){
        [err,res] = await ctx.mysql(`select * from classes where tid = '${tid}'`)
    }else{
        [err,res] = await ctx.mysql(`select * from classes`)
    }
    
    ctx.body={
        code: err?0:1,
        msg: err?err:res
    }
}

module.exports = {
    'PUT /class/create':create,
    'GET /class/list':list,
}