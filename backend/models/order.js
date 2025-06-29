const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: String,
      quantity: {
        type: Number,
        required: true
      },
      price: Number,
      total: Number
    }
  ],
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Online', 'Card'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  date: {
    type: Date,
    default: Date.now
  },
  totalAmount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);
