const express = require("express");
const router = express.Router();
const {
  updateUser,
  getAllUsers,
  deleteUser,
  updatePassword,
  getMe,
} = require("../controllers/user");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.patch("/update", verifyToken, updateUser);
router.patch("/:id", verifyToken, updatePassword);
router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/me", verifyToken, getMe);
router.delete("/:id", verifyTokenAndAdmin, deleteUser);

module.exports = router;
