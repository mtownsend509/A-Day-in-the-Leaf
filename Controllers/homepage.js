// dependencies
// express connection
const express = require('express');
const router = express.Router();
// models
const { Plant, Profile } = require("../Models");
// auth helper
const withAuth = require("../Utils/Auth");

// rendering routes
// render homepage
router.get("/", async (req, res) => {
  try {
    res.render("Homepage");
  // catch server error
  } catch (err) {
    res.status(500).json(err);
  }
});

// render login
router.get('/login', (req, res) => {
  // if already logged in redirect to dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// render signup
router.get('/signup', (req, res) => {
  // if already logged in redirect to dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

// render contact page
// TODO: future goal
router.get('/contact', (req, res) => {
  res.render('contact')
})
  
module.exports = router;