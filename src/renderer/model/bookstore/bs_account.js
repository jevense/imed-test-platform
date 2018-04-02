/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bs_account', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        account: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        account_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        area: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ca_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true
        },
        company: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        department: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        id_number: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        image_path: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        is_del: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        last_login_time: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        nick_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        qq: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        register_time: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        resource_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        sex: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        udid: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        teach_role: {
            type: DataTypes.STRING(255),
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
        institute_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        free_type: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        }
    }, {
        tableName: 'bs_account',
        timestamps: false,
    });
};
