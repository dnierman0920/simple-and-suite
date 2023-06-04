const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/verifyToken");
const { createCart , getSingleCart } = require("../controllers/cart");

router.post("/", verifyToken, createCart);
router.get("/:id", verifyToken, getSingleCart);

module.exports = router;
