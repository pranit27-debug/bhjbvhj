const Payment = require('./model');
const razorpay = require('../utils/razorpay');

const initiatePayment = async (userId, requestId, amount, paymentMethod) => {
    const payment = await Payment.create({
        userId,
        requestId,
        amount,
        paymentMethod,
        paymentStatus: 'pending',
    });

    const razorpayOrder = await razorpay.orders.create({
        amount: amount * 100, // paise
        currency: 'INR',
        receipt: payment._id.toString(), // using payment._id as receipt
        payment_capture: 1,
    });
    payment.receipt = razorpayOrder.id;
    await payment.save();

    return {
        payment,
        razorpayOrder,
    };
};

const handleWebhook = async (webhookBody) => {
    const event = webhookBody.event;
    const paymentEntity = webhookBody.payload.payment.entity;

    if (event === 'payment.captured') {
        const transactionId = paymentEntity.id;
        const orderId = paymentEntity.order_id;

        const payment = await Payment.findOneAndUpdate(
            { receipt: orderId },
            { paymentStatus: 'success', transactionId },
            { new: true }
        );

        return payment;
    }

    return null;
};

const getPaymentHistory = async (userId) => {
    const payments = await Payment.find({ userId }).sort({ createdAt: -1 });
    return payments;
};

const getPaymentDetails = async (paymentId, userId) => {
    const payment = await Payment.findOne({ _id: paymentId, userId });
    if (!payment) throw new Error('Payment not found');
    return payment;
};

const refundPayment = async (paymentId, userId) => {
    const payment = await Payment.findOne({ _id: paymentId, userId });
    if (!payment) throw new Error('Payment not found');
    if (payment.paymentStatus !== 'success') throw new Error('Only successful payments can be refunded');
    
    // Implement Razorpay refund logic here
    // For now, just mark as refunded
    payment.paymentStatus = 'refunded';
    await payment.save();
    
    return payment;
};

module.exports = {
    initiatePayment,
    handleWebhook,
    getPaymentHistory,
    getPaymentDetails,
    refundPayment,
};
