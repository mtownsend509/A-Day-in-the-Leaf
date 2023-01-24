const express = require('express');
const router = express.Router();
const { Plant, Profile } = require("../Models");
const withAuth = require("../Utils/Auth");

router.get("/", async (req, res) => {
  try {
    res.render("Homepage");
//catch server error  ============================================================================================  
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

router.get('/contact', (req, res) => {
  res.render('contact')
})
  
module.exports = router;