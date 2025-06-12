const mongoose = require("mongoose");
require("dotenv").config(); // loads .env

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB Atlas successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}

testConnection();
