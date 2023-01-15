const router = require('express').Router();

const logRoutes = require('./log-routes');

router.use('/log', logRoutes);

module.exportes = router