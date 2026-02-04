const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    profilePic: {
    type: String,
    default: 'https://asset.cloudinary.com/dnbutfdy7/8c9c3cc708a1dc7a3313dbbc030c3c01',
},
    preferences: {
    categories: { type: [String], default: [] },
    notifyFrequency: { type: String, enum: ["instant", "daily", "weekly"], default: "instant" },
},
    verified: { type: Boolean, default: false },
    verificationToken: String,
    emailVerificationOTP: String,
    emailVerificationOTPExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    tokenVersion: { type: Number, default: 0 },
    googleId: { type: String },
    appleId: { type: String },
    location: { type: String },
    avgRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
