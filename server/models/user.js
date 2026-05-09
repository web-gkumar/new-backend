const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true },
    name: { type: String },
    email: { type: String, unique: true },
    picture: { type: String },
    mobile: { type: String }, 
    address: { type: String },
    country: { type: String },
    village: { type: String },
    distic: { type: String },
    state: { type: String },
    pincode: { type: String },
    provider: { type: String, default: "google" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
