import {Sequelize,DataTypes} from 'sequelize'
// 创建数据库连接
const sequelize = new Sequelize('ca_db_3.0', 'root', 'weiyouxinda', {
    host: '60.205.209.147',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

// const sequelize = new Sequelize('ca_db_3.0', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// })

export default sequelize

export const Op = Sequelize.Op;

export const Promise = Sequelize.Promise;

export const Human = sequelize.define('ca_t_human', {
    caId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true
    },
    roles: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    instituteNumber: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    account: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true
    },
    pwd: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    pwd2: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },
    identificationNumber: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true
    },
    cellphone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    genderCode: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
            model: 'ca_t_gender',
            key: 'code'
        }
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    comments: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    deleted: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: '0'
    },
    frozen: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        defaultValue: '0'
    },
    deletedByInstitute: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        defaultValue: '0'
    },
    createTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    modifiedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    lockedUntil: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'ca_t_human',
    timestamps: false,
});
