const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const staffRoutes = require('./routes/staff.routes');
const customerRoutes = require('./routes/customer.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve static files (images)
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/api/staff', staffRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/product', productRoutes);
app.use('/api/orders', orderRoutes);

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
