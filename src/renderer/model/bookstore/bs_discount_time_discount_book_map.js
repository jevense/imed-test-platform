/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bs_discount_time_discount_book_map', {
        bs_fk_discount_time: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'bs_discount_time',
                key: 'id'
            }
        },
        discount: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        isbn: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        }
    }, {
        tableName: 'bs_discount_time_discount_book_map',
        timestamps: false,
    });
};
