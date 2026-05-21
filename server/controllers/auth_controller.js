const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/user");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try { const { name, email, mobile, password } = req.body;
    // 1. Validation
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ success: false, message: "All fields are required"});
    }
    // 2. Duplicate check (email + mobile)
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }]});
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email or Mobile already registered" });
    }
    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // 4. Create user
    const user = await User.create({ name, email, mobile, password: hashedPassword});
    // 5. Remove sensitive fields
    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.__v;
    // 6. Response
    return res.status(201).json({success: true, message: "Registration successful", user: safeUser});
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try { const { mobile, password } = req.body;
    if (!mobile || !password) {
      return res.status(400).json({success: false, message: "Mobile and password required" });
    }

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found", });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password",});
    }

    const token = jwt.sign(
      {userId: user._id, mobile: user.mobile},
      process.env.JWT_SECRET, { expiresIn: "5d",}
    );

    const userObj = user.toObject();
    delete userObj.password;
    return res.status(200).json({success: true, message: "Login successful", token, user: userObj,});
  } catch (err) {
    return res.status(500).json({success: false, message: err.message,});
  }

};


// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
  try {
    const { mobile } = req.body;
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found",});
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();
    return res.status(200).json({ success: true, message: "Reset token generated", resetToken,});
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message,});
  }
};

// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() }, });
    if (!user) {
      return res.status(400).json({success: false, message: "Invalid or expired token",});
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return res.status(200).json({success: true, message: "Password reset successful",});
  } catch (err) {
    return res.status(500).json({success: false, message: err.message,});
  }
};






