/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bs_book', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        abstracts: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        added_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        author: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        book_set: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        catalog: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        channel_price: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        cover: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        create_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        display_status: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ebook_status: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        edition: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        editor: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        is_del: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        is_free: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        is_newest: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        isbn: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        newest_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        origin_price: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        publication_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        publishing_agency: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        quality: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        recommend_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        rst_status: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        s9id: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        shelf_status: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        size: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        small_cover: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        sub_editor: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        subject_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        textbook: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        umpire: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        word_count: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        category_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'bs_category',
                key: 'id'
            }
        },
        cover_base: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cover2: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        patch_path: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        patch_version: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        book_set_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        edit_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        sequence: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        textbook_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        remark: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        chief_editor: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        executive_editor: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        short_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'bs_book'
    });
};
