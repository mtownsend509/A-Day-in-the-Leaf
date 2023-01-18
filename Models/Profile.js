const { Model, DataTypes } = require('sequelize');
// const { DataTypes } = require('sequelize/types');
const bcrypt = require('bcrypt');

const sequelize = require('../config/Connection.js');

class Profile extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING,
            // allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     len: [8, 64],
            //     // this validation only allows letter passwords and is case sensitive
            //     is: /^[0-9a-f]{64}$/i,
            // },
        },
    },

    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },

        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Profile'
    }
);

module.exports = Profile;


