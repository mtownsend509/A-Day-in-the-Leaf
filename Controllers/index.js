const express = require('express');
const router = express.Router();
const apiRoutes = require('./API');
const homepage = require('./homepage');

router.use('/', homepage);
router.use('/api', apiRoutes);

module.exports = router;