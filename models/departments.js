/* jshint indent: 2 */
"use strict";
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('departments', {
        ID: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }

        }
        ,
        {
        classMethods: {
            associate: function (modles) {
                this.hasMany(modles.employees, {foreignKey: "deptID"});
            }
        }
    });
};
