const express = require('express');
const router = express.Router();
const { Plant, Profile } = require("../Models");
const withAuth = require("../Utils/Auth");

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
                  loggedIn: true
                });
      })
      .catch(err => {
            console.log(err);
            res.status(500).json(err)
      })
})

router.get('/addPlant', withAuth, (req, res) => {
      res.render('Plantadd', {
            // loggedIn: req.session.loggedIn
            loggedIn: true
      })
})

router.get('/graves', withAuth, (req, res) => {
      res.render('graveyard', {
            // loggedIn: req.session.loggedIn
            loggedIn: true
      })
  })

router.get('/plantedit', (req, res) => {
      res.render('plantedit',{
            loggedIn: req.session.loggedIn
      })
})

// router.get('/graveyard', (req, res) => {
//       res.render('graveyard',{
//             loggedIn: req.session.loggedIn
//       })
// })

module.exports = router;