const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true 
  },
  pricePerDay: { type: Number, required: true },
  images: [{ type: String }], // Array of image URLs
  isAvailable: { type: Boolean, default: true },
  specifications: { type: Map, of: String }
}, { timestamps: true });

const Equipment = mongoose.model('Equipment', equipmentSchema);
module.exports = Equipment;
