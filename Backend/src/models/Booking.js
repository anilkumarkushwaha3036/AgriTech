const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  seeker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The one who books
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The owner of equipment/labor
  itemType: { type: String, enum: ['Equipment', 'User'], required: true }, // Booking machinery or booking a laborer (User)
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'itemType' }, // Dynamic reference
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'completed', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
