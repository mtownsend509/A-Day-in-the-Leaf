// dependencies
// terminal output styling
const chalk = require('chalk');
// plant seeds
const seedPlants = require('./plant-seed');
// profile seeds
const seedProfiles = require('./profile-seed');

// models
const { Plant } = require('../Models');
const { Profile } = require('../Models');

// db connection
const sequelize = require('../config/Connection');

// seed mysql
const seedTables = async () => {
    await sequelize.sync({force: true});
    console.log(chalk.bgHex('#2c2e28').white('\n----- DATABASE SYNCED -----\n'))

    await seedProfiles();
    console.log(chalk.bgHex('#2c2e28').white('\n----- PROFILES SEEDED -----\n'))

    await seedPlants();
    console.log(chalk.bgHex('#2c2e28').white('\n----- PLANTS SEEDED -----\n'))

    process.exit(0);
};

seedTables();