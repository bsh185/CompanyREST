/* jshint indent: 2 */
"use strict";
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('projects', {
            id: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            project_name: {
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
