// db connection
const sequelize = require('../config/Connection');

// model functionality
const { Model, DataTypes } = require('sequelize');

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
            type: DataTypes.STRING
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
            type: DataTypes.STRING
        },
        waterNeeds: {
            type: DataTypes.STRING
        },
        watered: {
            type: DataTypes.BOOLEAN
        },
        sunshineNeeds: {
            type: DataTypes.STRING
        },
        plantType: {
            type: DataTypes.STRING
        },
        // for cron job
        waterCurrent: {
            type: DataTypes.INTEGER
        },
        waterMax: {
            type: DataTypes.INTEGER
        },
        generalNotes: {
            type: DataTypes.STRING
        },
        profile_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Profile',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Plant',
    }
);

module.exports = Plant;