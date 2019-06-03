const Parameter = require('parameter')
const uuid = require('uuid/v4');
let parameter = new Parameter()
let jwt = require('jsonwebtoken')
module.exports = (app)=>{
    //把一个普通函数吧变成promise，只需在该函数内部return一个promise
    app.context.validate = (valid, data)=>{
        return new Promise((resolve,reject)=>{
            let error = parameter.validate(valid,data)
            if(!error){
                resolve([])
            }else{
                resolve(error)
            }
        })
    }
    app.context.createid = (prefix="")=>{
        return `${prefix}-`+uuid()
    }

    app.context.authCheck = function(){
        let decoded =null
        try{
            let authorization = this.get('authorization')
            decoded = jwt.verify(authorization, 'jack')
        }catch(err){
            decoded={
                error:err
            }
        }
        return decoded
    }
}