const express = require("express");
const router = express.Router();
const { login, signUp } = require("../controllers/auth");

router.post("/login", login);
router.post("/signup", signUp);

module.exports = router;
