const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const SECRET = process.env.JWT_SECRET;
const User = require("../models/userModel");

//@desc   Login
//@route  POST /api/v1/
//@access Public
const login = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email }).lean();

  if (!existingUser) {
    res.status(401).json({ message: "User doesn't exists!" });
  }

  //COMPARING PASSWORDS
  const isMatch = await bycrypt.compare(password, existingUser.password);
  
  if (isMatch) {
    const token = jwt.sign(
      {
        id: existingUser._id,
        isAdmin: existingUser.isAdmin,
      },
      SECRET,
      { expiresIn: "1d" }
    );

    const user = {
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      userId: existingUser._id,
      address: existingUser.address,
    };

    return res.status(200).json({ status: "success", data: { user, token } });
  } else {
    return res.status(400).json({ message: "Invalid credentials!" });
  }
};

//@desc   SignUp
//@route  POST /api/v1/
//@access Public
const signUp = async (req, res) => {
  const {
    email,
    password: plainTextPassword,
    firstName,
    lastName,
    isAdmin,
  } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ status: "error", error: "Invalid email" });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.status(400).json({ status: "error", error: "Invalid Password" });
  }
  if (plainTextPassword.length < 8) {
    return res.status(400).json({
      status: "error",
      error: "Password must contain at least 8 characters",
    });
  }

  //Check for duplicates
  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ status: "error", error: "Duplicate email" });
  }

  const password = await bycrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      email,
      password,
      firstName,
      lastName,
      isAdmin,
    });

    res.status(201).json({ status: "success", message: "User created" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(500)
        .json({ status: "error", error: "User already in use" });
    }
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
};

module.exports = { login, signUp };
