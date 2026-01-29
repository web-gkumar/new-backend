const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({url: String, type: String});
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    purpose: { type: String, enum: ["buy", "sell"], required: true },
    cropName: { type: String, required: true},
    price: { type: String, required: true},
    quantity: { type: String, required: true},
    deliveryDate: { type: Date,required: true},
    files: [FileSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
