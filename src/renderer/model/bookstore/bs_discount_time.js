/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bs_discount_time', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        enable: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        organization: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        update_time: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'bs_discount_time',
        timestamps: false,
    });
};
