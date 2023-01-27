// dependencies
// express connection
const express = require('express');
const router = express.Router();
// models
const { Profile, Plant, Graveyard } = require('../../Models');
// auth helper
const withAuth = require('../../Utils/Auth');

// get all plants route
router.get('/', async (req, res) => {
  Plant.findAll({
    attributes: [
      'id',
      'name',
      'species',
      'scientificName',
      'adoptionDate',
      'height',
      'stage',
      'waterNeeds',
      'waterCurrent',
      'watered',
      'sunshineNeeds',
      'generalNotes'
    ],

    include: [
      {
          model: Profile,
          attributes: ['username']
      },
    ],
  })
  .then(dbPlantData => res.json(dbPlantData))
  // if there was a server error, return the error
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
})

// get single plant route by id
router.get('/:id', async (req, res) => {
  Plant.findOne({
    where: {
      id: req.params.id
    },

    attributes: [
      'id',
      'name',
      'species',
      'scientificName',
      'adoptionDate',
      'height',
      'stage',
      'waterNeeds',
      'watered',
      'waterCurrent',
      'waterMax',
      'sunshineNeeds',
      'generalNotes'
    ],

    include: [
      {
          model: Profile,
          attributes: ['username']
      },
    ],
  })
  .then(dbPlantData => res.json(dbPlantData))
  // if there was a server error, return the error
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
})

// delete plant route by id
router.delete('/:id', (req, res) => {
  Plant.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPlantData => {
      if (!dbPlantData) {
        res.status(404).json({ message: 'No plant found with this id' });
        return;
      }
      res.json(dbPlantData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create plant route
router.post('/', (req, res) => {
  Plant.create({
        name: req.body.name,
        species: req.body.species,
        scientificName: req.body.scientificName,
        adoptionDate: req.body.adoptionDate,
        height: req.body.height,
        stage: req.body.stage,
        waterNeeds: req.body.waterNeeds,
        watered: req.body.watered,
        sunshineNeeds: req.body.sunshineNeeds,
        plantType: req.body.plantType,
        waterCurrent: 0,
        waterMax: req.body.waterMax,
        generalNotes: req.body.generalNotes,
        profile_id: req.body.profile_id
  })
  .then(dbPlantData => res.json(dbPlantData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

// update plant route
// TODO: implement get route by id prior to put route
router.put('/:id', (req, res) => {
  Plant.update({
    name: req.body.name,
    species: req.body.species,
    scientificName: req.body.scientificName,
    adoptionDate: req.body.adoptionDate,
    height: req.body.height,
    stage: req.body.stage,
    waterNeeds: req.body.waterNeeds,
    waterCurrent: req.body.waterCurrent,
    watered: req.body.watered,
    sunshineNeeds: req.body.sunshineNeeds,
    generalNotes: req.body.generalNotes,
  },
  {
    where: {
    id: req.params.id
    }
  })
  .then(dbPlantData => res.json(dbPlantData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

module.exports = router;