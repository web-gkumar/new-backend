const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({ url:String, type:String});
const OrderSchema = new mongoose.Schema(
{
  purpose: { type: String, enum: ["buy", "sell"], required: true},
  cropName: { type: String, required: true},
  price: { type: String, required: true},
  quantity: { type: String, required: true},
  deliveryDate: { type: Date},
  files: [FileSchema]
},
{timestamps: true}
);
module.exports = mongoose.model("Order", OrderSchema);

