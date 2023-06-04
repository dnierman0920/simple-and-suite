const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  deleteOrder,
  updateOrder,
} = require("../controllers/order");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.post("/", verifyToken, createOrder);
router.get("/", verifyTokenAndAdmin, getAllOrders);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
router.patch("/:id", verifyTokenAndAdmin, updateOrder);
router.get("/:id", verifyToken, getUserOrders);

module.exports = router;
