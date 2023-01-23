const express = require('express');
const router = express.Router();
const { Plant, Profile } = require("../models");
const withAuth = require("../utils/auth");

router.get('/', (req, res) => {
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
      .then(dbPlantData => {

            const plant = dbPlantData.map(plant => plant.get({ plain: true }));
            res.render('dashboard', {
                  plant,
                  loggedIn: req.session.loggedIn
                });
      })
      .catch(err => {
            console.log(err);
            res.status(500).json(err)
      })
})


router.get('/plant/:id', (req, res) => {
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
      .then(dbPlantData => {
            if (!dbPlantData) {
                  res.status(404).json({ message: 'No plant found with this id' });
                  return;
            }

            const plant = dbPlantData.get({ plain: true });
            res.render('plant', {
                  plant,
                  loggedIn: req.session.loggedIn
                });
      })
      .catch(err => {
            console.log(err);
            res.status(500).json(err)
      })
})

router.get('/addPlant', (req, res) => {
      res.render('Plantadd',{
            loggedIn: req.session.loggedIn
      })
})

router.get('/plantedit', (req, res) => {
      res.render('plantedit',{
            loggedIn: req.session.loggedIn
      })
})

module.exports = router;