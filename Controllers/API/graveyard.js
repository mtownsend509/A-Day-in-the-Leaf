// dependencies
// express connection
const express = require('express');
const router = express.Router();
// models
const { Profile, Plant, Graveyard } = require('../../Models');
// auth helper
const withAuth = require('../../Utils/Auth');

// Creates a row in graveyard table
router.post('/', (req, res) => {
  Graveyard.create({
        name: req.body.name,
        species: req.body.species,
        profile_id: req.body.profile_id
        // ...req.body,

  })
  .then(dbPlantData => res.json(dbPlantData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

// gives all gravyard data
router.get('/', async (req, res) => {
  // res.json({message : 'plants are here'});
  Graveyard.findAll({
    attributes: [
      'id',
      'name',
      'species',
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

module.exports = router;