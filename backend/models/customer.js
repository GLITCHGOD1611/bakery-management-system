const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
       
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        
    }
}, {
    collection: 'customers' // 👈 Force collection name
});

module.exports = mongoose.model('Customer', customerSchema);