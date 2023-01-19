const { Plant } = require('../Models');

const plants = [
    {
      name: 'Christofern',
      species: 'Sword Fern',
      scientificName: 'Polystichum munitum',
      adoptionDate: 'April 20th, 2017',
      height: 24,
      stage: 'mature',
      waterNeeds: 'Low biweekly',
      watered: false,
      sunshineNeeds: 'indirect light',
      // humidityNeeds: 'yes',
      // soilType: 'yes',
      // fertilizerType: 'yes',
      // idealTemp: 98,
      generalNotes: 'Plant keeps trying to die',
      profile_id: 1
    },
    {
      name: 'Zacartree',
      species: 'Alaskan Cedar',
      scientificName: 'Chamaecyparis nootkatensis',
      adoptionDate: 'September 17th, 2008',
      height: 55,
      stage: 'sapling',
      waterNeeds: 'High Weekly',
      watered: false,
      sunshineNeeds: 'indirect light',
      // humidityNeeds: 'yes',
      // soilType: 'yes',
      // fertilizerType: 'yes',
      // idealTemp: 98,
      generalNotes: 'neat plant bro',
      profile_id: 1
    },
    {
        name: 'Abikale',
        species: 'Kale',
        scientificName: 'Brassica oleracea',
        adoptionDate: 'May 12th, 2022',
        height: 12,
        stage: 'sprout',
        waterNeeds: 'Mid Weekly',
        watered: false,
        sunshineNeeds: 'Full sun',
        // humidityNeeds: 'yes',
        // soilType: 'yes',
        // fertilizerType: 'yes',
        // idealTemp: 98,
        generalNotes: 'solid plant 9/10, would be 10 but nobody eats Kale',
        profile_id: 2
      },
      {
        name: 'Kattail',
        species: 'Cattail',
        scientificName: 'Typha latifolia',
        adoptionDate: 'November 5th, 2019',
        height: 160,
        stage: 'mature',
        waterNeeds: 'High Daily',
        watered: false,
        sunshineNeeds: 'Full sun',
        // humidityNeeds: 'yes',
        // soilType: 'yes',
        // fertilizerType: 'yes',
        // idealTemp: 98,
        generalNotes: 'Do not eat the forbidden nature corndog',
        profile_id: 2
      },
];

const seedPlants = () => Plant.bulkCreate(plants)

module.exports = seedPlants;