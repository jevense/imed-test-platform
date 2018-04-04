/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ca_t_institutetype', {
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
        }
    }, {
        tableName: 'ca_t_institutetype',
        timestamps: false,
    });
};
