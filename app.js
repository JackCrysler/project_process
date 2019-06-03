/*
 * @Description: Have A Nice Day! program process manager sys
 * @Author: Jacky
 * @Date: 2019-06-03 11:23:22
 * @LastEditors: Jacky
 * @LastEditTime: 2019-06-03 18:43:58
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const routerConfig = require('./router/config')
const mysqlConfig = require('./db/config')
const validator = require('./utils/validator')
const authConf = require('./utils/authConf')
const morgan = require('koa-morgan')
let app = new Koa()
//logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
//verify authorization 
app.use(authConf)
//配置POST支持
app.use(bodyParser())
//验证规则
validator(app)
// 配置数据库
mysqlConfig(app)
// 配置程序路由
app.use(routerConfig('controller'))
//start server
app.listen(8088, () => { console.log(`server start at port 8088`) })