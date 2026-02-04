const express = require('express');
const router = express.Router();
const paymentController = require('./controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/initiate', authMiddleware, paymentController.initiatePayment);
router.get('/history', authMiddleware, paymentController.getPaymentHistory);
router.post('/webhook', paymentController.handleWebhook);
router.get('/:paymentId', authMiddleware, paymentController.getPaymentDetails);
router.post('/:paymentId/refund', authMiddleware, paymentController.refundPayment);

module.exports = router;
