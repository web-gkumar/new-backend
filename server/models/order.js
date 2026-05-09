const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({url: String, type: String});
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    purpose: { type: String, enum: ["buy", "sell"]},
    cropName: { type: String},
    price: { type: String},
    quantity: { type: String},
    deliveryDate: { type: Date},
    files: [FileSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
