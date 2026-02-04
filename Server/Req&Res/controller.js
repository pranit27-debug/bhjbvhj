const requestService = require('./service');

const createRequest = async (req, res) => {
    try {
    const request = await requestService.createRequest({
      borrowerId: req.user.id,
      ...req.body
    });
    res.status(201).json({ success: true, data: request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create request' });
  }
};

const getBorrowerRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const requests = await requestService.getBorrowerRequests({
      borrowerId: req.user.id,
      status,
      page,
      limit: parseInt(limit)
    });
    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get requests' });
  }
};

const getNearbyRequestsForLender = async (req, res) => {
  try {
    const { location, categories, page = 1, limit = 10 } = req.query;
    const requests = await requestService.getNearbyRequestsForLender({
      location,
      categories: categories ? categories.split(',') : [],
      page,
      limit: parseInt(limit)
    });
    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get nearby requests' });
  }
};

const respondToRequest = async (req, res) => {
  try {
    const offer = await requestService.respondToRequest({
      requestId: req.params.requestId,
      lenderId: req.user.id,
      ...req.body
    });
    res.status(201).json({ success: true, data: offer });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to respond to request' });
  }
};

const getOffersForRequest = async (req, res) => {
  try {
    const offers = await requestService.getOffersForRequest(req.params.requestId);
    res.json({ success: true, data: offers });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get offers' });
  }
};

const acceptOffer = async (req, res) => {
  try {
    const request = await requestService.acceptOffer({
      requestId: req.params.requestId,
      lenderId: req.body.lenderId
    });
    res.json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to accept offer' });
  }
};

const cancelRequest = async (req, res) => {
  try {
    const request = await requestService.cancelRequest(req.params.requestId);
    res.json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to cancel request' });
  }
};

const getRequestDetails = async (req, res) => {
  try {
    const requestDetails = await requestService.getRequestDetails(req.params.requestId);
    res.json({ success: true, data: requestDetails });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get request details' });
  }
};

const getMyOffers = async (req, res) => {
  try {
    const offers = await requestService.getMyOffers(req.user.id);
    res.json({ success: true, data: offers });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get offers' });
  }
};

const updateOffer = async (req, res) => {
  try {
    const offer = await requestService.updateOffer(req.params.offerId, req.user.id, req.body);
    res.json({ success: true, data: offer });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update offer' });
  }
};

const deleteOffer = async (req, res) => {
  try {
    await requestService.deleteOffer(req.params.offerId, req.user.id);
    res.json({ success: true, message: 'Offer deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete offer' });
  }
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
