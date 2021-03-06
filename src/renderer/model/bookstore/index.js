import {Sequelize} from 'sequelize'
// 创建数据库连接

// const sequelize = new Sequelize('book_store_3.0', 'root', 'weiyouxinda', {
//     host: '60.205.209.147',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// })

const sequelize = new Sequelize('book_store', 'lujiewen', 'MVW2018china', {
    host: 'rm-2ze9qof5ae28lu55ao.mysql.rds.aliyuncs.com',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

export default sequelize
export const Op = Sequelize.Op
export const Account = require('./bs_account')(sequelize, Sequelize)
export const Amount = require('./bs_amount')(sequelize, Sequelize)
export const BonusAmount = require('./bs_bonus_amount')(sequelize, Sequelize)
export const PurchasedBooks = require('./bs_purchased_books')(sequelize, Sequelize)
export const Book = require('./bs_book')(sequelize, Sequelize)
export const DiscountTime = require('./bs_discount_time')(sequelize, Sequelize)
export const DiscountBookMap = require('./bs_discount_time_discount_book_map')(sequelize, Sequelize)
export const ReadCoin = require('./bs_read_coin')(sequelize, Sequelize)
export const RecommendRecord = require('./bs_recommend_record')(sequelize, Sequelize)

DiscountTime.hasMany(DiscountBookMap, {as: 'discountBookMap', foreignKey: 'bs_fk_discount_time'})
