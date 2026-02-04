const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const preferencesController = require('./controller');

router.get('/preferences', authMiddleware, preferencesController.getPreferences);
router.put('/preferences', authMiddleware, preferencesController.updatePreferences);
router.get('/categories', preferencesController.getCategories);
router.post('/preferences/reset', authMiddleware, preferencesController.resetPreferences);

module.exports = router;
