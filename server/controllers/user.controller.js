const User = require("../models/user");


/* Get Profile */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password -resetPasswordToken -resetPasswordExpires -__v");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found"});
    }
    return res.status(200).json({success:true, user});
  } catch (err) {
    return res.status(500).json({success: false, message: "Profile fetch failed" });
  }
};


/* Update Profile */
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const allowedFields = ["name", "mobile", "address", "country", "village", "district", "state", "pincode", "picture"];
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) { updateData[field] = req.body[field];}
    });

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData}, { new: true, runValidators: true} ).select("-password -resetPasswordToken -resetPasswordExpires -__v");
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found"});
    }
    return res.status(200).json({ success: true, message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Profile update failed"});
  }





};