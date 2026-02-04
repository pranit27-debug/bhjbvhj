const express = require('express');
const router = express.Router();
const locationController = require('../Location/controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/nearby-requests', authMiddleware, locationController.getNearbyRequests);
router.get('/popular-locations', locationController.getPopularLocations);
router.get('/search-locations', locationController.searchLocations);

module.exports = router;
