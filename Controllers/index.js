const router = require('express').Router();
const apiRoutes = require('./api');
const homepage = require('./homepage');

router.use('/api', apiRoutes);
router.use('/', homepage);

module.exports = router;