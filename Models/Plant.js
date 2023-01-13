namconst { Model, Datatypes } = require('sequelize');
const { DataTypes } = require('sequelize/types');

const sequelize = require('../config/');

class Plant extends Model {}

Plant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        species: {
            type: DataTypes.STRING
        },
        height: {
            type: DataTypes.INTEGER
        },
        stage: {
            type: DataTypes.STRING
            //this will be like seed, sprout, or mature
        },
        waterNeeds: {
            type: DataTypes.STRING
        },
        watered: {
            type: DataTypes.BOOLEAN
            //Chron Job *third party
        },
        sunshineNeeds: {
            type: DataTypes.STRING
        },
    }
)