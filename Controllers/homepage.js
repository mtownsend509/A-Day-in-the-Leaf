const express = require('express');
const router = express.Router();
const { Plant, Profile } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all plants and JOIN with profile data =================================================================
    const plantData = await Plant.findAll({
      include: [
        {
          model: Profile,
          //QUESTION: what attributes do we want to include?=====================================================?
          attributes: [""],
        },
      ],
    });

    // plain: true to return only plain object ===================================================================
    const plants = plantData.map((plant) => plant.get({ plain: true }));

    res.render("Homepage", {
      plants,
      logged_in: req.session.logged_in,
    });
//catch server error  ============================================================================================  
  } catch (err) {
    res.status(500).json(err);
  }
});

// withAuth to verify logged in===================================================================================
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in profile based on the session ID ======================================================
      const profileData = await Profile.findByPk(req.session.profile_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Plant }],
      });

//get req only "plain" object=====================================================================================     
      const profile = profileData.get({ plain: true });
  
      res.render('profile', {
        ...profile,
        logged_in: true
      });
//catch server errors ============================================================================================
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {

    // If logged in, redirect to profile route ===================================================================
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;
  