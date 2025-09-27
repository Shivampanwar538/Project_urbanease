const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  slot: { type: String }, // e.g., "10:00-12:00"
  price: Number,
  status: { type: String, enum: ['pending','confirmed','completed','cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
