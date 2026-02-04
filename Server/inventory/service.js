const Inventory = require('./model');

class InventoryService {
  // Create a new inventory item
  async createInventory(inventoryData) {
    try {
      const inventory = new Inventory(inventoryData);
      await inventory.save();
      return inventory;
    } catch (error) {
      throw new Error(`Failed to create inventory: ${error.message}`);
    }
  }

  // Get all published inventory items
  async getPublishedInventory(filters = {}) {
    try {
      const query = { status: 'published', isAvailable: true };
      
      // Add category filter
      if (filters.category) {
        query.category = filters.category;
      }

      // Add search filter
      if (filters.search) {
        query.$text = { $search: filters.search };
      }

      // Add location filter (nearby items)
      if (filters.latitude && filters.longitude && filters.radius) {
        query.location = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(filters.longitude), parseFloat(filters.latitude)]
            },
            $maxDistance: filters.radius * 1000 // Convert km to meters
          }
        };
      }

      const inventory = await Inventory.find(query)
        .populate('lender', 'name email profilePicture')
        .sort({ createdAt: -1 })
        .limit(filters.limit || 50);

      return inventory;
    } catch (error) {
      throw new Error(`Failed to fetch inventory: ${error.message}`);
    }
  }

  // Get inventory by ID
  async getInventoryById(id) {
    try {
      const inventory = await Inventory.findById(id)
        .populate('lender', 'name email profilePicture');
      
      if (!inventory) {
        throw new Error('Inventory item not found');
      }
      
      return inventory;
    } catch (error) {
      throw new Error(`Failed to fetch inventory: ${error.message}`);
    }
  }

  // Get inventory by lender (user)
  async getInventoryByLender(lenderId) {
    try {
      const inventory = await Inventory.find({ lender: lenderId })
        .sort({ createdAt: -1 });
      return inventory;
    } catch (error) {
      throw new Error(`Failed to fetch lender inventory: ${error.message}`);
    }
  }

  // Update inventory item
  async updateInventory(id, updateData, lenderId) {
    try {
      const inventory = await Inventory.findOneAndUpdate(
        { _id: id, lender: lenderId },
        updateData,
        { new: true, runValidators: true }
      );

      if (!inventory) {
        throw new Error('Inventory item not found or unauthorized');
      }

      return inventory;
    } catch (error) {
      throw new Error(`Failed to update inventory: ${error.message}`);
    }
  }

  // Delete inventory item
  async deleteInventory(id, lenderId) {
    try {
      const inventory = await Inventory.findOneAndDelete({ _id: id, lender: lenderId });
      
      if (!inventory) {
        throw new Error('Inventory item not found or unauthorized');
      }

      return inventory;
    } catch (error) {
      throw new Error(`Failed to delete inventory: ${error.message}`);
    }
  }

  // Publish draft inventory
  async publishInventory(id, lenderId) {
    try {
      const inventory = await Inventory.findOneAndUpdate(
        { _id: id, lender: lenderId, status: 'draft' },
        { status: 'published', isAvailable: true },
        { new: true, runValidators: true }
      );

      if (!inventory) {
        throw new Error('Draft inventory item not found or unauthorized');
      }

      return inventory;
    } catch (error) {
      throw new Error(`Failed to publish inventory: ${error.message}`);
    }
  }

  // Mark inventory as unavailable
  async markUnavailable(id, lenderId) {
    try {
      const inventory = await Inventory.findOneAndUpdate(
        { _id: id, lender: lenderId },
        { isAvailable: false },
        { new: true }
      );

      if (!inventory) {
        throw new Error('Inventory item not found or unauthorized');
      }

      return inventory;
    } catch (error) {
      throw new Error(`Failed to update inventory availability: ${error.message}`);
    }
  }

  // Get inventory statistics
  async getInventoryStats(lenderId) {
    try {
      const stats = await Inventory.aggregate([
        { $match: { lender: lenderId } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);

      return stats;
    } catch (error) {
      throw new Error(`Failed to fetch inventory stats: ${error.message}`);
    }
  }
}

module.exports = new InventoryService();

