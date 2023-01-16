const seedPlants = require('./plant-seed');
const seedProfiles = require('./profile-seed');

const sequelize = require('../config/connection');

const seedTables = async () => {
    await sequelize.sync({force: true});
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedPlants();
    console.log('\n----Plants Seeded -------\n');
    await seedProfiles();
    console.log('\n----Profiles Seeded -------\n');

    process.exit(0);
};

seedTables();