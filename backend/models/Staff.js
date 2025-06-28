const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
}, {
  collection: 'staff' // 👈 Force collection name
});

module.exports = mongoose.model('Staff', staffSchema);
