const User = require("../models/user");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({
      success: true,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
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

    // Fields jo update ho sakte hain
    const { name, mobile, address, country } = req.body;

    // User ko find karke update karo
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fields update karo agar provided hain
    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (address) user.address = address;
    if (country) user.country = country;

    // Save the updated user
    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        mobile: user.mobile,
        address: user.address,
        country: user.country,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile update failed" });
  }
};
