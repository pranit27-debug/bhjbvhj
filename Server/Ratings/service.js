const Rating = require('./model');
const User = require('../Auth/auth.model');

// 1. Submit rating
const submitRating = async (fromUserId, { requestId, toUserId, rating, review }) => {
    const existing = await Rating.findOne({ requestId, fromUserId, toUserId });
    if (existing) throw new Error('You have already rated this user for this request');

    const newRating = await Rating.create({
        requestId,
        fromUserId,
        toUserId,
        rating,
        review,
    });

    // Update avgRating and ratingCount of toUserId
    const allRatings = await Rating.find({ toUserId });
    const ratingCount = allRatings.length;
    const avgRating = allRatings.reduce((sum, r) => sum + r.rating, 0) / ratingCount;

    await User.findByIdAndUpdate(toUserId, {
        avgRating: avgRating.toFixed(2),
        ratingCount,
    });

    return newRating;
};

// 2. Get ratings for user
const getUserRatings = async (userId) => {
    const ratings = await Rating.find({ toUserId: userId })
        .populate('fromUserId', 'name email')
        .populate('requestId', 'itemName rentalStart rentalEnd');
    return ratings;
};

// 3. Edit rating
const editRating = async (ratingId, fromUserId, { rating, review }) => {
    const existingRating = await Rating.findById(ratingId);
    if (!existingRating) throw new Error('Rating not found');
    if (existingRating.fromUserId.toString() !== fromUserId.toString()) {
        throw new Error('You can only edit your own ratings');
    }

    existingRating.rating = rating;
    existingRating.review = review;
    await existingRating.save();

    // Update avgRating and ratingCount of toUserId
    const allRatings = await Rating.find({ toUserId: existingRating.toUserId });
    const ratingCount = allRatings.length;
    const avgRating = allRatings.reduce((sum, r) => sum + r.rating, 0) / ratingCount;

    await User.findByIdAndUpdate(existingRating.toUserId, {
        avgRating: avgRating.toFixed(2),
        ratingCount,
    });

    return existingRating;
};

// 4. Get ratings I submitted
const getSubmittedRatings = async (fromUserId) => {
    const ratings = await Rating.find({ fromUserId })
        .populate('toUserId', 'name email')
        .populate('requestId', 'itemName rentalStart rentalEnd')
        .sort({ createdAt: -1 });

    return ratings;
};

module.exports = {
    submitRating,
    getUserRatings,
    editRating,
    getSubmittedRatings,
};
