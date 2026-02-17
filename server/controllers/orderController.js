const Order = require("../models/order");

/* ✅ Create Order */
exports.createOrder = async (req, res) => {
  try {
    const files = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      type: file.mimetype.startsWith("image") ? "image" : "video"
    }));

    const order = new Order({
      userId: req.body.userId,
      purpose: req.body.purpose,
      cropName: req.body.cropName,
      price: req.body.price,
      quantity: req.body.quantity,
      deliveryDate: req.body.deliveryDate,
      files
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      data: order
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




/* ✅ Get User Orders */
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ✅ Update Order */
exports.updateOrder = async (req, res) => {
  try {
    const updateData = {
      userId: req.body.userId,
      purpose: req.body.purpose,
      cropName: req.body.cropName,
      price: req.body.price,
      quantity: req.body.quantity,
      deliveryDate: req.body.deliveryDate
    };
    if (req.files && req.files.length > 0) {
      updateData.files = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        type: file.mimetype.startsWith("image") ? "image" : "video"
      }));
    }

    const updatedOrder = await Order.findByIdAndUpdate( req.params.id, updateData,{ new: true });
    res.json({success: true, message: "Order updated successfully", data: updatedOrder});
  } catch (err) {res.status(500).json({success: false, message: err.message});
  }
};



/* ✅ Delete Order */
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


