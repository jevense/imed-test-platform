import {Sequelize} from 'sequelize'
// 创建数据库连接

// const sequelize = new Sequelize('ca_db_5002_v2.0', 'root', 'weiyouxinda', {
//     host: '60.205.209.147',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// })

const sequelize = new Sequelize('cadb2', 'lujiewen', 'MVW2018china', {
    host: 'rm-2ze9qof5ae28lu55ao.mysql.rds.aliyuncs.com',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

export default sequelize

export const Op = Sequelize.Op;

export const Promise = Sequelize.Promise;

export const Human = require('./ca_t_human')(sequelize, Sequelize)

export const Institute = require('./ca_t_institute')(sequelize, Sequelize)
const InstituteType = require('./ca_t_institutetype')(sequelize, Sequelize)
const Area = require('./ca_t_area')(sequelize, Sequelize)

Institute.belongsTo(InstituteType, {as: 'instituteType', foreignKey: 'instituteTypeCode', targetKey: 'code'})
Institute.belongsTo(Area, {as: 'province', foreignKey: 'provinceCode', targetKey: 'code'})
Institute.belongsTo(Area, {as: 'city', foreignKey: 'cityCode', targetKey: 'code'})
Institute.belongsTo(Area, {as: 'district', foreignKey: 'districtCode', targetKey: 'code'})


