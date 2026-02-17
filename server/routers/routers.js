const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const { googleLogin } = require("../controllers/auth_controller");
const { getProfile, updateProfile  } = require("../controllers/user.controller");
const orderCtrl  = require("../controllers/orderController");
const upload = require("../config/multer");

/* Profile */
router.post("/google-login", googleLogin);
//router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

/* Orders */
router.post("/orders", upload.array("files", 5), orderCtrl.createOrder);
router.put("/orders/:id", upload.array("files"), orderCtrl.updateOrder);
router.get("/orders/:userId", orderCtrl.getOrdersByUser);
router.delete("/orders/:id", orderCtrl.deleteOrder);


module.exports = router;
