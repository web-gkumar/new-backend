const User = require("../models/user");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({ success: true,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        country: user.country,
        vllage: user.vllage,
        distic: user.distic,
        state: user.state,
        pincode: user.pincode,
        picture: user.picture,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile fetch failed" });
  }
};






// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, mobile, address, country } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (address) user.address = address;
    if (country) user.country = country;
    if (village) user.village = village;
    if (distic) user.distic = distic;
    if (state) user.state = state;
    if (pincode) user.pincode = pincode;

    // Save the updated user
    await user.save();

    res.json({ success: true, message: "Profile updated successfully", user: { user } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile update failed" });
  }
};
