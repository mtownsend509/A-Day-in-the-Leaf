const seedPlants = require('./plant-seed');
const seedProfiles = require('./profile-seed');

const { Plant } = require('../Models');
const { Profile } = require('../Models');

const sequelize = require('../config/Connection');

const seedTables = async () => {
    await sequelize.sync({force: true});
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedProfiles();
    console.log('\n----Profiles Seeded -------\n');
    await seedPlants();
    console.log('\n----Plants Seeded -------\n');

    process.exit(0);
};

seedTables();