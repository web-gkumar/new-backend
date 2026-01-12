const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const { googleLogin } = require("../controllers/auth_controller");
const { getProfile, updateProfile  } = require("../controllers/user.controller");

router.post("/google-login", googleLogin);
router.get('/profile', authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);


module.exports = router;
