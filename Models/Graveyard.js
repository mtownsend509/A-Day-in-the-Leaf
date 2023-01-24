const sequelize = require('../config/Connection');

const { Model, DataTypes } = require('sequelize');
// const { DataTypes } = require('sequelize/types');

class Graveyard extends Model {}

Graveyard.init(
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
            // type: DataTypes.DATEONLY,
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
        modelName: 'Graveyard',
    }
);

module.exports = Graveyard;