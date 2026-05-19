const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({ url:String, type:String});
const OrderSchema = new mongoose.Schema(
{
  purpose: { type: String, enum: ["buy", "sell"]},
  mobile: { type: String },
  cropName: { type: String},
  price: { type: String},
  quantity: { type: String},
  deliveryDate: { type: Date},
  files: [FileSchema]
},
{timestamps: true}
);
module.exports = mongoose.model("Order", OrderSchema);

