const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      maxPoolSize: 10,                 // Optimized connection pool size for Atlas Free/Shared tiers
      serverSelectionTimeoutMS: 5000,  // Fast fail in 5s if Atlas is unreachable
      socketTimeoutMS: 45000,          // Close inactive sockets to prevent memory leaks
      family: 4                        // Force IPv4 (prevents DNS lag on local/windows environments)
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Connected (Atlas): ${conn.connection.host}`);

    // Register active listeners for Atlas connection stability
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB Atlas connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB Atlas connection lost. Reconnecting...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB Atlas successfully reconnected.');
    });
    
    // Drop the old unique email index if it exists to prevent E11000 duplicate key error on null emails
    try {
      await mongoose.connection.db.collection('users').dropIndex('email_1');
      console.log('Successfully dropped old email index (email_1)');
    } catch (indexError) {
      // If the index doesn't exist, Mongoose throws IndexNotFound which we can safely ignore
      if (indexError.codeName !== 'IndexNotFound' && indexError.code !== 27) {
        console.warn('Note: Mongoose could not drop email index:', indexError.message);
      }
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB Atlas: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
