// dependencies
// express connection
const express = require('express')
const router = express.Router()
// individual routes
const profileRoutes = require('./profile');
const plantRoutes = require('./plantRoutes');
const graveRoutes = require('./graveyard');

// implement routes
router.use('/graveyard', graveRoutes);
router.use('/profile', profileRoutes);
router.use('/plant', plantRoutes);

module.exports = router;