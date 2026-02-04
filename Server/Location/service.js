const Request = require('../Req&Res/model');

const findNearbyRequests = async (lat, lng, radiusKm) => {
  const radiusMeters = radiusKm * 1000;

    const nearbyRequests = await Request.find({
    location: {
    $nearSphere: {
        $geometry: {
        type: "Point",
        coordinates: [lng, lat],
        },
        $maxDistance: radiusMeters,
    }
    }
});

    return nearbyRequests;
};

const getPopularLocations = async () => {
    const locations = await Request.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: '$location', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
    ]);
    
    return locations;
};

const searchLocations = async (query) => {
    const regex = new RegExp(query, 'i');
    const locations = await Request.distinct('location', {
        'location.type': 'Point',
        $or: [
            { 'location.coordinates': { $exists: true } }
        ]
    });
    
    // Filter locations that match the query (this is a simplified approach)
    // In a real app, you might want to use a geocoding service
    return locations.filter(loc => 
        loc.coordinates && loc.coordinates.length === 2
    ).slice(0, 10);
};

module.exports = {
    findNearbyRequests,
    getPopularLocations,
    searchLocations,
};
