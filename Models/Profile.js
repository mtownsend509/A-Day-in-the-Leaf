const { Model, Datatypes } = require('sequelize');
const { DataTypes } = require('sequelize/types');

const sequelize = require('../config/');

class Profile extends Model {}

Profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Profile'
    }
)

module.exports = Profile;