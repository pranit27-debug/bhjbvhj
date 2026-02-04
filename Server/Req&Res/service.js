const Request = require('./model');
const Offer = require('../offers/model');

const createRequest = async ({ borrowerId, itemName, itemCategory, rentalStart, rentalEnd, location, notes }) => {
    const request = new Request({
        borrower: borrowerId,
        itemName,
        itemCategory,
        rentalStart,
        rentalEnd,
        location,
        notes,
        status: 'active'
    });
    return await request.save();
};

const getBorrowerRequests = async ({ borrowerId, status, page, limit }) => {
    const query = { borrower: borrowerId };
    if (status) query.status = status;
  return Request.find(query).skip((page - 1) * limit).limit(limit);
};

const getNearbyRequestsForLender = async ({ location, categories, page, limit }) => {
    const query = { status: 'active' };
    if (categories) query.itemCategory = { $in: categories };
    if (location) query.location = location;
  return Request.find(query).skip((page - 1) * limit).limit(limit);
};

const respondToRequest = async ({ requestId, lenderId, itemName, photos, conditionDesc, rentalAmountPerHour, notes }) => {
    const offer = new Offer({
        requestId,
        lender: lenderId,
        itemName,
        photos,
        conditionDesc,
        rentalAmountPerHour,
        notes
    });
    return await offer.save();
};

const getOffersForRequest = async (requestId) => {
    return Offer.find({ requestId });
};

const acceptOffer = async ({ requestId, lenderId }) => {
    return Request.findByIdAndUpdate(requestId, {
    status: 'matched',
    matchedLender: lenderId
    }, { new: true });
};

const cancelRequest = async (requestId) => {
    return Request.findByIdAndUpdate(requestId, {
    status: 'cancelled'
    }, { new: true });
};

const getRequestDetails = async (requestId) => {
    const request = await Request.findById(requestId).lean();
    const offers = await Offer.find({ requestId });
    return { ...request, offers };
};

const getMyOffers = async (lenderId) => {
    return Offer.find({ lender: lenderId })
        .populate('requestId', 'itemName itemCategory rentalStart rentalEnd location status')
        .sort({ createdAt: -1 });
};

const updateOffer = async (offerId, lenderId, updates) => {
    const offer = await Offer.findOne({ _id: offerId, lender: lenderId });
    if (!offer) throw new Error('Offer not found or access denied');
    
    Object.assign(offer, updates);
    return await offer.save();
};

const deleteOffer = async (offerId, lenderId) => {
    const result = await Offer.deleteOne({ _id: offerId, lender: lenderId });
    if (result.deletedCount === 0) throw new Error('Offer not found or access denied');
    return result;
};

module.exports = {
    createRequest,
    getBorrowerRequests,
    getNearbyRequestsForLender,
    respondToRequest,
    getOffersForRequest,
    acceptOffer,
    cancelRequest,
    getRequestDetails,
    getMyOffers,
    updateOffer,
    deleteOffer
};
