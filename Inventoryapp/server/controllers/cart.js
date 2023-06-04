const Cart = require("../models/cartModel");

//@desc   Create cart
//@route  POST /api/v1/cart
//@access Private
const createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    res.status(200).json({ status: "success", savedCart });
  } catch (error) {
    res.status(400).json({ Message: "Something went wrong" });
  }
};

//@desc   Get cart
//@route  Get /api/v1/cart
//@access Private
const getSingleCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id).exec();
    
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error });
  }
};

module.exports = {
  getSingleCart,
  createCart,
};
