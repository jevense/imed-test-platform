/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ca_t_area', {
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        parentcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_area',
                key: 'code'
            }
        }
    }, {
        tableName: 'ca_t_area',
        timestamps: false
    });
};
