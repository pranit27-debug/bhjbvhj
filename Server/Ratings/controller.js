const ratingService = require('./service');

exports.submitRating = async (req, res) => {
    try {
        const rating = await ratingService.submitRating(req.user.id, req.body);
        res.status(201).json({ success: true, rating });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getUserRatings = async (req, res) => {
    try {
        const ratings = await ratingService.getUserRatings(req.params.userId);
        res.json({ success: true, ratings });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.editRating = async (req, res) => {
    try {
        const updatedRating = await ratingService.editRating(
            req.params.ratingId,
            req.user.id,
            req.body
        );
        res.json({ success: true, rating: updatedRating });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getMySubmittedRatings = async (req, res) => {
    try {
        const userId = req.user.id;

        const ratings = await ratingService.getSubmittedRatings(userId);

        res.json({ success: true, ratings });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

