const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        name: {
          type: String,
        },
        imageUrl: {
          type: String,
        },
        color: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    total: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
