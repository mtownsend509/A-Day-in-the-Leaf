const express = require('express');
const router = express.Router();
const { Plant } = require('../../models');
const withAuth = require('../../utils/auth');

//auth verifies logged in before executing==========================================================================
router.post('/', withAuth, async (req, res) => {
    try {

      const newPlant = await Plant.create({
        ...req.body,
        profile_id: req.session.profile_id,
      });
  
      res.status(200).json(newPlant);
    } catch (err) {
      res.status(400).json(err);
    }

  });

//delete plant using ID, verifies that logged in before executing =================================================
  router.delete('/:id', withAuth, async (req, res) => {
    try {

      const plantData = await Plant.destroy({
        where: {
          id: req.params.id,
          profile_id: req.session.profile_id,
        },
      });
//if plant ID not found throw 404 error============================================================================
      if (!plantData) {
        res.status(404).json({ message: 'There is no plant with this id!' });
        return;
      }
  
 //200 error for successful request ==============================================================================
      res.status(200).json(plantData);
 //catch server error ============================================================================================     
    } catch (err) {
      res.status(500).json(err);
    }

  });  

  module.exports = router;