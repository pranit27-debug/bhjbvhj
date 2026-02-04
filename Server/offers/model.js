const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
    lender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemName: String,
    photos: [String],
    conditionDesc: String,
    rentalAmountPerHour: Number,
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
