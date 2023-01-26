// dependencies
// express connection
const express = require('express');
const router = express.Router();
// individual routes
const apiRoutes = require('./API');
const homeRoutes = require('./homepage');
const dashRoutes = require('./dashboard');

// implement routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;