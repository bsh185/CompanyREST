/* jshint indent: 2 */
"use strict";
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('employees', {

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {msg: "First Name Must Contain Alphabetical Letters Only"}
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {msg: "Last Name Must Contain Alphabetical Letters Only"}
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isInt: {
                    msg: "Phone Must Contain Numbers Only"
                }
            }
        },
        projectID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            validate: {
                isInt: {
                    msg: "projectID Must Contain Numbers Only"
                }
            }
        },
        deptID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            validate: {
                isInt: {
                    msg: "deptID Must Contain Numbers Only"
                }
            }
        }
        }

        , {

        classMethods: {
            associate: function (modles) {
                this.belongsTo(modles.departments, {foreignKey: "deptID"});
                this.belongsTo(modles.projects, {foreignKey: "projectID"});
            }

        }

        });
};
