const fs = require('fs')
let test = async (ctx)=>{
    let test = fs.readFileSync('./views/test.html', 'utf-8')
    ctx.response.type = 'text/html'
    ctx.response.body=test
}

module.exports = {
    'GET /':test
}

