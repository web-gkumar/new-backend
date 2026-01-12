const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("DB URL 👉", process.env.DATABASE_URL);
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;