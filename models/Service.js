const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  image: String,
  rating: Number,
  distance: String
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
