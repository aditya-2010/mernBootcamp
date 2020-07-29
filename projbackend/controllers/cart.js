const { Cart, ProductInCart } = require("../models/cart");

exports.getCartById = (req, res, next, id) => {
  Cart.findById(id)
    .populate("products.product", "name price")
    .exec((err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "No items in DB",
        });
      }
      req.cart = cart;
      next();
    });
};

exports.createCart = (req, res) => {
  req.body.cart.user = req.profile;
  const cart = new Cart(req.body.cart);
  cart.save((err, cart) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your item in DB",
      });
    }
    res.json(cart);
  });
};

exports.getAllOrders = (req, res) => {
  Cart.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        res.status(400).json({
          error: "Found no Orders in DB",
        });
      }
      res.json(orders);
    });
};

exports.updateStatus = (req, res) => {
  Cart.update(
    { _id: req.body.cartId },
    { $set: { status: req.body.satus } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status",
        });
      }
      res.json(order);
    }
  );
};

exports.getOrderStatus = (req, res) => {
  res.json(Cart.schema.path("status").enumValues);
};
