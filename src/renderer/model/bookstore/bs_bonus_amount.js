/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bs_bonus_amount', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        create_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        expire_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        is_del: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        original_point: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        platform: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        point: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        remark: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        account_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'bs_account',
                key: 'id'
            }
        }
    }, {
        tableName: 'bs_bonus_amount',
        timestamps: false,
    });
};
