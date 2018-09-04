/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bs_recommend_record', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        gift_amount: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        recommend_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        used: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        account_id: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        is_del: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'bs_recommend_record',
        timestamps: false,
    });
};
