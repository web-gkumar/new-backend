const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { verifyGoogleToken } = require("./googleAuth");

exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "ID Token required" });
    }

    const payload = await verifyGoogleToken(idToken);
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      });

      console.log("✅ NEW USER SAVED IN DB:", user.email);
    } else {
      console.log("ℹ️ USER ALREADY EXISTS:", user.email);
    }

    // 🔐 JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Google login success",
      token,
      user,
    });

  } catch (err) {
    console.error("🔥 Google Login Error:", err);
    return res.status(500).json({
      message: "Google authentication failed",
      error: err.message,
    });
  }
};
