const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'Breakfast', 'Snacks', 'Beverages'
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  imageUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);