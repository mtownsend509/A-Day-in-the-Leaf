const express = require('express');
const router = express.Router();
const apiRoutes = require('./API');
const homeRoutes = require('./homepage');
const dashRoutes = require('./dashboard');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;