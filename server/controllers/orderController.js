const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  try {
    const files = (req.files || []).map(file => ({url: `/uploads/${file.filename}`, type: file.mimetype.startsWith("image") ? "image" : "video"}));
    const order = new Order({...req.body, files});
    await order.save();
    return res.status(201).json({success: true, message: "Order saved successfully", data: order});
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message});
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({userId: req.params.userId}).sort({ createdAt: -1 });
    return res.json({success: true, data: orders});
  } catch (err) {
    return res.status(500).json({success: false, message: err.message});
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updateData = {...req.body};
    const files = req.files || [];
    if (files.length > 0) {
      updateData.files = files.map(file => ({ url: `/uploads/${file.filename}`, type: file.mimetype.startsWith("image") ? "image" : "video" }));
    }
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });
    return res.json({success: true, message: "Order updated successfully", data: updatedOrder });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });}
};


exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json({success: true, message: "Order deleted", data: orders});
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


