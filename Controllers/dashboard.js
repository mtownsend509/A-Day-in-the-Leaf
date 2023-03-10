// dependencies
// express connection
const express = require('express');
const router = express.Router();
// models
const { Plant, Profile, Graveyard } = require("../Models");
// auth helper
const withAuth = require("../Utils/Auth");

// rendering routes
// get all plants route
router.get('/', withAuth, (req, res) => {
      Plant.findAll({
            where: {
                  // use the ID from the session
                  profile_id: req.session.profile_id
            },
            attributes: [
                  'id',
                  'name',
                  'species',
                  'scientificName',
                  'adoptionDate',
                  'height',
                  'stage',
                  'plantType',
                  'waterNeeds',
                  'watered',
                  'sunshineNeeds',
                  'generalNotes'
            ],
            include: [
                  {
                      model: Profile,
                      attributes: ['username', 'id']
                  },
            ],
      })
      // render dashboard
      .then(dbPlantData => {

            const plant = dbPlantData.map(plant => plant.get({ plain: true }));
            console.log("this is the plant:", plant);
            res.render('dashboard', {
                  plant,
                  loggedIn: true
                });
      })
      .catch(err => {
            console.log(err);
            res.status(500).json(err)
      })
})

// get plant by id route
router.get('/plant/:id', withAuth, (req, res) => {
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
                  'plantType',
                  'waterMax',
                  'watered',
                  'sunshineNeeds',
                  'generalNotes'
            ],
            include: [
                  {
                      model: Profile,
                      attributes: ['username', 'id']
                  },
            ],
      })
      // render single plant page
      .then(dbPlantData => {
            if (!dbPlantData) {
                  res.status(404).json({ message: 'No plant found with this id' });
                  return;
            }

            const plant = dbPlantData.get({ plain: true });
            res.render('plant', {
                  plant,
                  loggedIn: true
                });
      })
      .catch(err => {
            console.log(err);
            res.status(500).json(err)
      })
})

// render add plant page
// functionality in public js
router.get('/addPlant', withAuth, (req, res) => {
      res.render('Plantadd', {
            // loggedIn: req.session.loggedIn
            loggedIn: true
      })
})

// get all graveyard plants where the profile id matches
router.get('/graves', withAuth, (req, res) => {
      Graveyard.findAll({
            where: {
                  // use the ID from the session
                  profile_id: req.session.profile_id
            },
            attributes: [
                  'id',
                  'name',
                  'species'
            ],
            include: [
                  {
                      model: Profile,
                      attributes: ['username', 'id']
                  },
            ],
      })

      // render graveyard dashboard
      .then(dbGraveyardData => {

            const graveyard = dbGraveyardData.map(graveyard => graveyard.get({ plain: true }));
            console.log("this is the plant:", graveyard);
            res.render('graveyard', {
                  graveyard,
                  loggedIn: true
                });
      })
      .catch(err => {
            console.log(err);
            res.status(500).json(err)
      })
})

// render edit plant page
// nonfunctional, future goal
// TODO: rewrite as a get route for plant by id, then put route by id, then render edit page
router.get('/plantedit', (req, res) => {
      res.render('plantedit',{
            loggedIn: req.session.loggedIn
      })
})

module.exports = router;