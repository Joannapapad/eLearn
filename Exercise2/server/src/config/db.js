const mongoose = require("mongoose");

// Establish connection to MongoDB using Mongoose
const connectDB = async () => {
  try {
    // Connect using the .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);

    process.exit(1);
  }
};

// Export database connection function
module.exports = connectDB;
