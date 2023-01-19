const express = require('express')
const router = express.Router()

const profileRoutes = require('./profile');
const plantRoutes = require('./plantRoutes');

router.use('/profile', profileRoutes);
router.use('/plant', plantRoutes);

module.exports = router;

