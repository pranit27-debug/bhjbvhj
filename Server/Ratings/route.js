const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const ratingController = require('./controller');

router.post('/', authMiddleware, ratingController.submitRating);
router.put('/:ratingId', authMiddleware, ratingController.editRating);
router.get('/my-submitted', authMiddleware, ratingController.getMySubmittedRatings);
router.get('/:userId', authMiddleware, ratingController.getUserRatings);

module.exports = router;
