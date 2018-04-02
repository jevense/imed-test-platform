/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bs_purchased_books', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        create_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        edit_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        end_date: {
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
        start_date: {
            type: DataTypes.DATE,
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
        },
        book_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'bs_book',
                key: 'id'
            }
        }
    }, {
        tableName: 'bs_purchased_books',
        timestamps: false,
    });
};
