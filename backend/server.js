const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const staffRoutes = require('./routes/staff.routes');

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/staff', staffRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
