/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ca_t_institute', {
        caid: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        comments: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        createtime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        modifieddate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        deleted: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '0'
        },
        parentid: {
            type: DataTypes.STRING(36),
            allowNull: true,
            references: {
                model: 'ca_t_institute',
                key: 'caid'
            }
        },
        hassubinstitutes: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '0'
        },
        nationalnum: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true
        },
        provincecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_area',
                key: 'code'
            }
        },
        citycode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_area',
                key: 'code'
            }
        },
        districtcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_area',
                key: 'code'
            }
        },
        address: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        postnumber: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        website: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        institutetypecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_institutetype',
                key: 'code'
            }
        },
        institutestatuscode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_institutestatus',
                key: 'code'
            }
        },
        institutenumber: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true
        },
        linkmanname: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        linkmangendercode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_gender',
                key: 'code'
            }
        },
        linkmandepartment: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        linkmantel: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        linkmanphone: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        linkmanemail: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        logo: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        collegeregistrationlevelcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_collegeregistrationlevel',
                key: 'code'
            }
        },
        collegetypecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_collegetype',
                key: 'code'
            }
        },
        hospitaltypecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_hospitaltype',
                key: 'code'
            }
        },
        hospitallevelcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_hospitallevel',
                key: 'code'
            }
        },
        hospitalgradecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_hospitalgrade',
                key: 'code'
            }
        },
        hospitalregistrationtypecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_hospitalregistrationtype',
                key: 'code'
            }
        },
        medicalinstitutetypecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_medicalinsitutetype',
                key: 'code'
            }
        },
        medicalinstitutecharactercode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_medicalinsitutecharacter',
                key: 'code'
            }
        },
        concurrentlimit: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        userlimit: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        tableName: 'ca_t_institute',
        timestamps: false
    });
};
