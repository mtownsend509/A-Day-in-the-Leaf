const { Profile } = require('../Models');

const profileSeeds = [
    {
      userName: 'JuiceJabroney',
      password: 'starfox1!'
    },
    {
      userName: 'GoshOfWar',
      password: 'HorseCow3#'
    }        
];

const seedProfile = () => Profile.bulkCreate(profileSeeds);

module.exports = seedProfile;