const express = require('express');
const router = express.Router();
const apiRoutes = require('./API');

router.use('/api', apiRoutes);

module.exports = router;