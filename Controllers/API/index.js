const router = require('express').Router();
const profileRoutes = require('./profileRoutes');
const plantRoutes = require('./plantRoutes');

router.use('/profile', profileRoutes);
router.use('/plant', plantRoutes);

module.exports = router;
