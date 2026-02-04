const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const parser = require('../middlewares/upload');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/me', authMiddleware, controller.getProfile);
router.put('/me', authMiddleware, parser.single('profilePic'), controller.updateProfile);
router.get('/verify-email', controller.verifyEmail);
router.post('/logout', authMiddleware, controller.logout);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password', controller.resetPassword);
router.post('/resend-verification', controller.resendVerification);
router.post('/verify-email-otp', controller.verifyEmailOTP);
router.post('/google', controller.googleLogin);
router.post('/apple', controller.appleLogin);
router.get('/google/callback', controller.googleCallback);
router.get('/apple/callback', controller.appleCallback);
router.post('/refresh-token', controller.refreshToken);
router.post('/change-password', authMiddleware, controller.changePassword);
router.get('/stats', authMiddleware, controller.getUserStats);
router.delete('/me', authMiddleware, controller.deleteAccount);

module.exports = router;
