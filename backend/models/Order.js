const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
    quantity: Number,
  }],
  customerName: String,
  address: String,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
