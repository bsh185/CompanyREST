/* jshint indent: 2 */
"use strict";
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('projects', {
            ID: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            projectName: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
        , {
            classMethods: {
                associate: function (modles) {
                    this.hasMany(modles.employees, {foreignKey: "projectID"});
                }
            }
        }
    );
};
