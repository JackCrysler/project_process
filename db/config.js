const mysql = require('mysql')

let client = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"1610A"
})

client.connect()

module.exports = function(app){
    app.context.mysql = (sql)=>{
        // pending fullfilled reject  then catch finally |  all
        return new Promise((resolve,reject)=>{
            client.query(sql,(err,results)=>{
                if(err){
                    resolve([err,null])
                }else{
                    resolve([null,results])
                }
            })
        })
    }
}
