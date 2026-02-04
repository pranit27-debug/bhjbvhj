const mongoose = require('mongoose');

const chatThreadSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: {
        type: String,
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('ChatThread', chatThreadSchema);
