const express = require('express');
const router = express.Router();
const inventoryController = require('./controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Create new inventory item
router.post('/', inventoryController.createInventory);

// Get all published inventory items (public, no auth required)
router.get('/public', async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      search: req.query.search,
      latitude: req.query.latitude,
      longitude: req.query.longitude,
      radius: req.query.radius || 10,
      limit: parseInt(req.query.limit) || 50
    };

    const inventoryService = require('./service');
    const inventory = await inventoryService.getPublishedInventory(filters);
    
    res.status(200).json({
      success: true,
      message: 'Inventory items fetched successfully',
      data: inventory
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get inventory by ID (public, no auth required)
router.get('/public/:id', async (req, res) => {
  try {
    const inventoryService = require('./service');
    const inventory = await inventoryService.getInventoryById(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Inventory item fetched successfully',
      data: inventory
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
});

// Get current user's inventory
router.get('/my-inventory', inventoryController.getMyInventory);

// Get inventory statistics
router.get('/stats', inventoryController.getInventoryStats);

// Update inventory item
router.put('/:id', inventoryController.updateInventory);

// Delete inventory item
router.delete('/:id', inventoryController.deleteInventory);

// Publish draft inventory
router.post('/:id/publish', inventoryController.publishInventory);

// Mark inventory as unavailable
router.post('/:id/unavailable', inventoryController.markUnavailable);

module.exports = router;

