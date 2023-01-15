const { Model, Datatypes } = require('sequelize');
const { DataTypes } = require('sequelize/types');

const sequelize = require('../config/');

class Plant extends Model {}

Plant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        species: {
            // type: DataTypes.STRING
            type: DataTypes.DATEONLY,
        },
        scientificName: {
            type: DataTypes.STRING
        },
        adoptionDate: {
            type: DataTypes.STRING
        },
        height: {
            type: DataTypes.INTEGER
        },
        stage: {
            // type: DataTypes.STRING
            //this will be like seed, sprout, or mature
            // enum will only accept certain values, might make it easier if we track with pictures
            // would need to specify these values to user in the prompt
            type: DataTypes.ENUM,
            values: ['seed', 'sprout', 'mature']
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
        humidityNeeds: {
            type: DataTypes.STRING
        },
        soilType: {
            type: DataTypes.STRING
        },
        fertilizerType: {
            type: DataTypes.STRING
        },
        idealTemp: {
            type: DataTypes.INTEGER
        },
        generalNotes: {
            type: DataTypes.STRING
        },
        profile_ID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Profile',
                key: 'id'
            }
        }
    }
);

module.exports = Plant;