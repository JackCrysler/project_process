const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

function configRouter(filepath){
    let dir = fs.readdirSync(path.join(process.cwd(), filepath))

    dir.forEach(filename=>{
        let api = require(path.join(process.cwd(), filepath,filename))
        addRoute(api)
    })
}

function addRoute(userApi){
    let apis = Object.entries(userApi)

    apis.forEach(item=>{
        let [method,path] = item[0].split(' ')
        router[method.toLowerCase()](path, item[1])
        
    })
}

module.exports = function(filepath){
    configRouter(filepath)
    return router.routes()
}
