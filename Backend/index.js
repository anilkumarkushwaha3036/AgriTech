const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./src/config/db');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to AgriTech API');
});

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/equipment', require('./src/routes/equipmentRoutes'));
app.use('/api/bookings', require('./src/routes/bookingRoutes'));
app.use('/api/payment', require('./src/routes/paymentRoutes'));
app.use('/api/upload', require('./src/routes/uploadRoutes'));
app.use('/api/labor', require('./src/routes/laborRoutes'));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
