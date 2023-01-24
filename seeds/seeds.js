const chalk = require('chalk');
const seedPlants = require('./plant-seed');
const seedProfiles = require('./profile-seed');

const { Plant } = require('../Models');
const { Profile } = require('../Models');

const sequelize = require('../Config/Connection');

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