/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ca_t_institute', {
        caId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        roles: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        account: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true
        },
        pwd: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        provinceCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_area',
                key: 'code'
            }
        },
        cityCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_area',
                key: 'code'
            }
        },
        districtCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_area',
                key: 'code'
            }
        },
        instituteNumber: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true
        },
        instituteTypeCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_institutetype',
                key: 'code'
            }
        },
        instituteStatusCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_institutestatus',
                key: 'code'
            }
        },
        address: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        postNumber: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        webSite: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        linkmanName: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        linkmanGenderCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_gender',
                key: 'code'
            }
        },
        linkmanDepartment: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        linkmanTel: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        linkmanPhone: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        linkmanEmail: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        collegeRegistrationLevelCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_collegeregistrationlevel',
                key: 'code'
            }
        },
        collegeTypeCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_collegetype',
                key: 'code'
            }
        },
        hospitalTypeCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_hospitaltype',
                key: 'code'
            }
        },
        hospitalLevelCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_hospitallevel',
                key: 'code'
            }
        },
        hospitalRegistrationTypeCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_hospitalregistrationtype',
                key: 'code'
            }
        },
        comments: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        deleted: {
            type: DataTypes.INTEGER(1),
            allowNull: true
        },
        parentId: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        concurrentLimit: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        userLimit: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        hasSubInstitutes: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        logo: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        nationalNum: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        createTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        modifiedDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        tableName: 'ca_t_institute',
        timestamps: false,
    });
};
