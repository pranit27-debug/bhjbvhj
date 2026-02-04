const inventoryService = require('./service');

class InventoryController {
  // Create new inventory item
  async createInventory(req, res) {
    try {
      const inventoryData = {
        ...req.body,
        lender: req.user.id,
        status: 'draft' // Default to draft
      };

      const inventory = await inventoryService.createInventory(inventoryData);
      
      res.status(201).json({
        success: true,
        message: 'Inventory item created successfully',
        data: inventory
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get all published inventory items
  async getPublishedInventory(req, res) {
    try {
      const filters = {
        category: req.query.category,
        search: req.query.search,
        latitude: req.query.latitude,
        longitude: req.query.longitude,
        radius: req.query.radius || 10, // Default 10km radius
        limit: parseInt(req.query.limit) || 50
      };

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
  }

  // Get inventory by ID
  async getInventoryById(req, res) {
    try {
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
  }

  // Get inventory by current user (lender)
  async getMyInventory(req, res) {
    try {
      const inventory = await inventoryService.getInventoryByLender(req.user.id);
      
      res.status(200).json({
        success: true,
        message: 'Your inventory items fetched successfully',
        data: inventory
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update inventory item
  async updateInventory(req, res) {
    try {
      const inventory = await inventoryService.updateInventory(
        req.params.id,
        req.body,
        req.user.id
      );
      
      res.status(200).json({
        success: true,
        message: 'Inventory item updated successfully',
        data: inventory
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete inventory item
  async deleteInventory(req, res) {
    try {
      await inventoryService.deleteInventory(req.params.id, req.user.id);
      
      res.status(200).json({
        success: true,
        message: 'Inventory item deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Publish draft inventory
  async publishInventory(req, res) {
    try {
      const inventory = await inventoryService.publishInventory(
        req.params.id,
        req.user.id
      );
      
      res.status(200).json({
        success: true,
        message: 'Inventory item published successfully',
        data: inventory
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Mark inventory as unavailable
  async markUnavailable(req, res) {
    try {
      const inventory = await inventoryService.markUnavailable(
        req.params.id,
        req.user.id
      );
      
      res.status(200).json({
        success: true,
        message: 'Inventory item marked as unavailable',
        data: inventory
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get inventory statistics
  async getInventoryStats(req, res) {
    try {
      const stats = await inventoryService.getInventoryStats(req.user.id);
      
      res.status(200).json({
        success: true,
        message: 'Inventory statistics fetched successfully',
        data: stats
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new InventoryController();

