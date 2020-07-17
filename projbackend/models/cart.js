const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productInCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
  deliveryDate: Date,
});

const ProductInCart = mongoose.model("ProductInCart", productInCartSchema);

const cartSchema = new mongoose.Schema(
  {
    products: [productInCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: { type: String, required: true, maxLength: 500 },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart, ProductInCart };
