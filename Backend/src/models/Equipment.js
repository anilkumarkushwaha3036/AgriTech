const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true 
  },
  pricePerDay: { type: Number },
  pricePerHour: { type: Number },
  images: [{ type: String }], // Array of image URLs
  status: { type: String, enum: ['Available', 'Working', 'Not Active'], default: 'Available' },
  specifications: { type: Map, of: String }
}, { timestamps: true });

const Equipment = mongoose.model('Equipment', equipmentSchema);
module.exports = Equipment;
