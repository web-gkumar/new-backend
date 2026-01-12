const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    picture: { type: String },
    mobile: { type: Number }, 
    address: { type: String },
    country: { type: String }, 

    provider: { type: String, default: "google" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
