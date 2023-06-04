const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
let client = require("@sendgrid/mail");
client.setApiKey(process.env.SENDGRID_API_KEY);

//@desc   Create Order
//@route  POST /api/v1/order
//@access Private
const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    const user = await User.findOne({ _id: req.body.userId });
    //ORDER CONFIRMATION EMAIL
    client
      .send({
        to: {
          email: user.email,
          name: "John",
        },
        from: {
          email: "chathuraperera007@gmail.com",
          name: "California MERN Ecommerce",
        },
        templateId: "d-7468459ea2854821a7d9d1928aa3a7e1",
        dynamicTemplateData: {
          name: req.body.userName,
          orderId: savedOrder._id,
          cartTotal: req.body.total,
          orderTotal: req.body.total + 5,
          address: req.body.shippingAddress.street,
          city: req.body.shippingAddress.city,
          state: req.body.shippingAddress.state,
          postalCode: req.body.shippingAddress.postalCode,
        },
      })
      .then(() => {
        console.log("Email was sent");
      })
      .catch((error) => {
        console.log(error);
      });

    res.status(201).json({ message: "Order created", savedOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//@desc   Get all carts
//@route  GET /api/v1/cart
//@access Private
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({}).lean().exec();
    res.status(200).json({ message: "success", data: allOrders });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//@desc   Update order
//@route  PUT /api/v1/order
//@access Private
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(400).json({ message: "Order doesn't exists" });
    }

    res.status(200).json({ message: "Order updated", data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//@desc   Delete Order
//@route  DELETE /api/v1/order
//@access Private
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId });
    const foundCart = await Cart.findOne({ _id: order.cartId });

    increaseQuantity(foundCart.products);

    await Order.deleteOne({ _id: orderId });
    await Cart.deleteOne({ _id: foundCart._id });

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//@desc   Get my orders
//@route  GET /api/v1/order
//@access Private
const getUserOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.find({ userId: id }).lean().exec();
    console.log(orders);
    res.status(200).json({ status: "success", orders });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const increaseQuantity = (products) => {
  let bulkOptions = products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product.foundCart },
        update: { $inc: { quantity: product.quantity } },
      },
    };
  });
  Product.bulkWrite(bulkOptions);
};

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  getUserOrders,
  deleteOrder,
};
