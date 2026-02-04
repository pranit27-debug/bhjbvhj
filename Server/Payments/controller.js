const paymentService = require('./service');

exports.initiatePayment = async (req, res) => {
    try {
        const { payment, razorpayOrder } = await paymentService.initiatePayment(
            req.user.id,
            req.body.requestId,
            req.body.amount,
            req.body.paymentMethod
        );

        res.status(201).json({
            success: true,
            payment,
            razorpayOrder,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.handleWebhook = async (req, res) => {
    try {
        const payment = await paymentService.handleWebhook(req.body);

        if (payment) {
            res.json({ success: true });
        } else {
            res.json({ success: true, message: 'Event ignored' });
        }
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getPaymentHistory = async (req, res) => {
    try {
        const payments = await paymentService.getPaymentHistory(req.user.id);

        res.json({ success: true, payments });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getPaymentDetails = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentDetails(req.params.paymentId, req.user.id);
        res.json({ success: true, payment });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.refundPayment = async (req, res) => {
    try {
        const refund = await paymentService.refundPayment(req.params.paymentId, req.user.id);
        res.json({ success: true, refund });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
