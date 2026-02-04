const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const chatController = require('./controller');

router.get('/threads', authMiddleware, chatController.getThreads);
router.get('/threads/:threadId', authMiddleware, chatController.getThreadMessages);
router.post('/threads/:threadId/messages', authMiddleware, chatController.sendMessage);
router.post('/threads', authMiddleware, chatController.startThread);
router.post('/threads/:threadId/read', authMiddleware, chatController.markThreadRead);
router.get('/users/search', authMiddleware, chatController.searchUsers);
router.delete('/threads/:threadId', authMiddleware, chatController.deleteThread);

module.exports = router;
