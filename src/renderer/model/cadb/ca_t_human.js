/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ca_t_human', {
        caid: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        comments: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        deleted: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '0'
        },
        frozen: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '0'
        },
        deletedbyinstitute: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '0'
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
        lockeduntil: {
            type: DataTypes.DATE,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        account: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true
        },
        cellphone: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true
        },
        identificationtypecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_identificationtype',
                key: 'code'
            }
        },
        identificationnumber: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true
        },
        pwd: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        remark: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        portrait: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        institutenumber: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        departmentid: {
            type: DataTypes.STRING(36),
            allowNull: true,
            references: {
                model: 'ca_t_department',
                key: 'caid'
            }
        },
        idtypecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_idtype',
                key: 'code'
            }
        },
        traineemajorcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_subject',
                key: 'code'
            }
        },
        traineeyear: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        haslicense: {
            type: DataTypes.INTEGER(1),
            allowNull: true
        },
        licensenum: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        internshipmajorcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_subject',
                key: 'code'
            }
        },
        apprenticemajorcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_subject',
                key: 'code'
            }
        },
        postgraduatemajorcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_subject',
                key: 'code'
            }
        },
        advancedmajorcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_subject',
                key: 'code'
            }
        },
        nursingdepartmentid: {
            type: DataTypes.STRING(36),
            allowNull: true,
            references: {
                model: 'ca_t_department',
                key: 'caid'
            }
        },
        gendercode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_gender',
                key: 'code'
            }
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        ethnicitycode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_ethnicity',
                key: 'code'
            }
        },
        qq: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        wechat: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        address: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        diplomacode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_diploma',
                key: 'code'
            }
        },
        degreecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_degree',
                key: 'code'
            }
        },
        degreetypecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_degreetype',
                key: 'code'
            }
        },
        graduationcollege: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        graduationmajor: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        graduationyear: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        specialitytitlecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_specialitytitle',
                key: 'code'
            }
        },
        occupation: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        occupationstartfrom: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        isintermediateover3years: {
            type: DataTypes.INTEGER(1),
            allowNull: true
        },
        teachingstartfrom: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        lengthofteaching: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        teachingsubjectcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_subject',
                key: 'code'
            }
        },
        studentfreshtypecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_studentfreshtype',
                key: 'code'
            }
        },
        formerworkplace: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        entrustinghospitallevelcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_hospitallevel',
                key: 'code'
            }
        },
        entrustinghospitalgradecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_hospitalgrade',
                key: 'code'
            }
        },
        entrustingmedicalinstitutetypecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_medicalinsitutetype',
                key: 'code'
            }
        },
        entrustingmedicalinstitutecharactercode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_medicalinsitutecharacter',
                key: 'code'
            }
        },
        schedulingdepartmentid: {
            type: DataTypes.STRING(36),
            allowNull: true,
            references: {
                model: 'ca_t_department',
                key: 'caid'
            }
        },
        duration: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        istrainedcooperatively: {
            type: DataTypes.INTEGER(1),
            allowNull: true
        },
        cooperativeinstitute: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        studentsourcecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_studentsource',
                key: 'code'
            }
        },
        grade: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        englishlevelcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_englishlevel',
                key: 'code'
            }
        },
        computerlevelcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_computerlevel',
                key: 'code'
            }
        },
        admissiondate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        departuredate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        trainercapablesubjectcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_subject',
                key: 'code'
            }
        },
        tutorcapablesubjectcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_subject',
                key: 'code'
            }
        },
        beattendingtime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        hascertificate: {
            type: DataTypes.INTEGER(1),
            allowNull: true
        },
        certificatenum: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        certificatetypecode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'ca_t_certificatetype',
                key: 'code'
            }
        },
        allroles: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'ca_t_human',
        timestamps: false
    });
};
