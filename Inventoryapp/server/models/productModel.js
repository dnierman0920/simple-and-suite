const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  colors: {
    type: Array,
  },
  imageUrl: {
    type: String,
    default: "https://i.ibb.co/R62DvRM/woocommerce-placeholder.png",
  },
  price: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "unisex"],
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  quantity: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Product", productSchema);
