/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bs_amount', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        common_point: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        create_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        edit_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        is_del: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        point: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        account_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'bs_account',
                key: 'id'
            }
        },
        sum_common_point: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        sum_point: {
            type: DataTypes.DECIMAL,
            allowNull: true
        }
    }, {
        tableName: 'bs_amount',
        timestamps: false,
    });
};
