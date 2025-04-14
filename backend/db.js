const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('your_mongo_connection_string', //I'd add this later
        {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
