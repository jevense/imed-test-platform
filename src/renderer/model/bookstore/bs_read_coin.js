/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bs_read_coin', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        recommend_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        account_id: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        gift_state: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        last_trade_no: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        is_del: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'bs_read_coin',
        timestamps: false,
    });
};
