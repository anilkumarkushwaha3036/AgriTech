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

// Default Route (REMOVED)
// Humne "Welcome to AgriTech API" hata diya kyuki ye React App ke load hone se pehle hi 
// pure homepage ( / ) ko block kar raha tha. Ab default page Express Public folder se aayega.

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/equipment', require('./src/routes/equipmentRoutes'));
app.use('/api/bookings', require('./src/routes/bookingRoutes'));
app.use('/api/payment', require('./src/routes/paymentRoutes'));
app.use('/api/upload', require('./src/routes/uploadRoutes'));
app.use('/api/labor', require('./src/routes/laborRoutes'));

// Serve static frontend files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// ----------------------------------------------------
// FALLBACK ROUTE: Any URL that is not an API should serve the React App
// This is critical for React Router to work correctly on specific paths. (SPA)
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    next();
  }
});
// ----------------------------------------------------

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
