const { Profile } = require('../Models');

const profileSeeds = [
    {
      username: 'JuiceJabroney',
      password: 'starfox1!'
    },
    {
      username: 'GoshOfWar',
      password: 'HorseCow3#'
    }        
];

const seedProfile = () => Profile.bulkCreate(profileSeeds);

module.exports = seedProfile;