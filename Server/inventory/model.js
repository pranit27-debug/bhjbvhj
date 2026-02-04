const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  lender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Furniture', 'Appliances', 'Bikes', 'Tools', 'Electronics', 'Sports']
  },
  condition: { 
    type: String, 
    required: true,
    enum: ['Like New', 'Excellent', 'Good', 'Fair']
  },
  rateType: { 
    type: String, 
    required: true,
    enum: ['per_hour', 'per_day', 'per_week']
  },
  rate: { 
    type: Number, 
    required: true,
    min: 0 
  },
  deposit: { 
    type: Number, 
    min: 0 
  },
  availableFrom: { 
    type: Date, 
    required: true 
  },
  availableTo: { 
    type: Date, 
    required: true 
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  description: { 
    type: String, 
    trim: true 
  },
  addressLine1: { 
    type: String, 
    required: true 
  },
  addressLine2: { 
    type: String 
  },
  city: { 
    type: String, 
    required: true 
  },
  stateRegion: { 
    type: String, 
    required: true 
  },
  pincode: { 
    type: String, 
    required: true 
  },
  pickupWindowStart: { 
    type: String 
  },
  pickupWindowEnd: { 
    type: String 
  },
  pickupNote: { 
    type: String 
  },
  contactPhone: { 
    type: String, 
    required: true 
  },
  images: [{ 
    type: String 
  }],
  status: { 
    type: String, 
    enum: ['draft', 'published', 'rented', 'inactive'],
    default: 'draft'
  },
  isAvailable: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

// Create geospatial index for location-based queries
inventorySchema.index({ location: '2dsphere' });

// Create text index for search functionality
inventorySchema.index({ 
  title: 'text', 
  description: 'text', 
  category: 'text' 
});

module.exports = mongoose.model('Inventory', inventorySchema);

