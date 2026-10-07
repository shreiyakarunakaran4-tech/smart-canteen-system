const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tokenNumber: { type: Number, required: true },
  customerName: { type: String, default: 'Student' },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Ready', 'Collected'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);