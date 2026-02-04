const locationService = require('./service');

const getNearbyRequests = async (req, res) => {
    try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const radius = parseFloat(req.query.radius) || 5; // Default radius in kilometers

    if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({ success: false, error: 'Invalid or missing lat/lng' });
    }

    const requests = await locationService.findNearbyRequests(lat, lng, radius);

    res.json({ success: true, requests });
    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    }
};

const getPopularLocations = async (req, res) => {
    try {
        const locations = await locationService.getPopularLocations();
        res.json({ success: true, locations });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const searchLocations = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query || query.length < 2) {
            return res.status(400).json({ success: false, error: 'Search query must be at least 2 characters' });
        }
        
        const locations = await locationService.searchLocations(query);
        res.json({ success: true, locations });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getNearbyRequests,
    getPopularLocations,
    searchLocations,
};
