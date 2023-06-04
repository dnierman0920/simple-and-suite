const express = require("express");
const router = express.Router();
const { createAddress, getMyAddress, deleteAddress } = require("../controllers/address");
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middleware/verifyToken");

router.post("/", verifyToken, createAddress);
router.get("/:id", verifyToken, getMyAddress);
router.delete("/:id", verifyToken, deleteAddress);

module.exports = router;
