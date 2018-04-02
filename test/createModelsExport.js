// 生成modole文件

let fs = require('fs')
let files = fs.readdirSync('./cadb')
let models = []
// 解析名称做成驼峰命名法
files.forEach(item => {
    if (item !== 'index.js') {
        let names = item.split('.')[0].split('_')
        let name = ''
        for (let i = 1; i < names.length; i++) {
            name += names[i].substring(0, 1).toUpperCase() + names[i].substring(1)
        }
        models.push({name: name, path: './' + item})
    }
})
// 文件内容模板
const template = `import {Sequelize} from 'sequelize'
// 创建数据库连接
let sequelize = new Sequelize('hhdj', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})
// 数据库模型名称及路径
const models =${JSON.stringify(models, null, 4)}
// 数据模型输出
models.forEach(item => {
    module.exports[item.name] = require(item.path)(sequelize, Sequelize)
})
`
fs.writeFile("./cadb/index.js", template, function () {
    console.log('创建成功')
})
