const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

//@desc   Get my details
//@route  GET /api/v1
//@access Private
const getMe = async (req, res) => {
  try {
    console.log("req.user", req.user);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//@desc   Get all users
//@route  GET /api/v1
//@access Private
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false })
      .select("-password")
      .lean();
    if (!users) {
      return res.status(400).json({ message: "No users found" });
    }
    res.status(200).json({ message: "success", data: users });
  } catch (error) {}
};

//@desc   Update account details
//@route  PATCH /api/v1
//@access Private
const updateUser = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, address } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "ID is required" });
    }

    const user = await User.findById(userId).exec();

    //Preventing from using an email address that already exists
    const duplicate = await User.find({ email }).lean().exec();

    if (duplicate.length && duplicate[0]._id.toString() !== userId) {
      return res.status(409).json({ message: "Duplicate email address" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.address = address;

    const updatedUser = await user.save();

    res.status(200).json({ message: `${updatedUser.firstName} updated` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong", error: error });
  }
};

//@desc   Update password
//@route  PATCH /api/v1
//@access Private
const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const existingUser = await User.findOne({ _id: id });
    console.log("existingUser", existingUser);

    if (await bcrypt.compare(oldPassword, existingUser.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      existingUser.password = hashedPassword;
      existingUser.save();
    } else {
      return res
        .status(400)
        .json({ message: "Please enter your correct old password." });
    }
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    re.status(500).json({ message: "Something went wrong" });
  }
};

//@desc   Delete a account
//@route  DELETE /api/v1
//@access Private
const deleteUser = async (req, res) => {
  try {
    console.log("controller");
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "user ID required" });
    }
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(400).json({ message: `No user with id ${id}` });
    }
    res.status(200).json({ message: "user deleted " });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateUser, updatePassword, getAllUsers, deleteUser, getMe };
