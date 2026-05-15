const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const { login, register, forgotPassword, resetPassword } = require("../controllers/auth_controller");
const { getProfile, updateProfile  } = require("../controllers/user.controller");
const orderCtrl  = require("../controllers/orderController");
const upload = require("../config/multer");

/* Profile */
router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/profile", authMiddleware, updateProfile);

/* Orders */
router.get("/orders", orderCtrl.getOrdersByUser);
router.post("/orders", upload.array("files", 5), orderCtrl.createOrder);
router.put("/orders/:id", upload.array("files"), orderCtrl.updateOrder);
router.delete("/orders/:id", orderCtrl.deleteOrder);


module.exports = router;
