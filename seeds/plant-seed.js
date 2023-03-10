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
      watered: true,
      sunshineNeeds: 'indirect light',
      plantType: 'yes',
      waterCurrent: 1,
      waterMax: 7,
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
      watered: true,
      sunshineNeeds: 'indirect light',
      plantType: 'yes',
      waterCurrent: 1,
      waterMax: 7,
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
        watered: true,
        sunshineNeeds: 'Full sun',
        plantType: 'flowering',
        waterCurrent: 8,
        waterMax: 7,
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
        watered: true,
        sunshineNeeds: 'Full sun',
        plantType: 'yes',
        waterCurrent: 1,
        waterMax: 7,
        generalNotes: 'Do not eat the forbidden nature corndog',
        profile_id: 2
      },
];

const seedPlants = () => Plant.bulkCreate(plants)

module.exports = seedPlants;