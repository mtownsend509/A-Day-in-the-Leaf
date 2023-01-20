const express = require('express');
const router = express.Router();
const { Plant, Profile } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("Homepage", {
      logged_in: req.session.logged_in,
    });
//catch server error  ============================================================================================  
  } catch (err) {
    res.status(500).json(err);
  }
});


  router.get('/login', (req, res) => {
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
  
    res.render('signup');
  });
  
  module.exports = router;
  