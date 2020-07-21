const User = require("../models/user");
const { Cart } = require("../models/cart");
const { findOneAndUpdate } = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    // database callback
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  // removing sensitive info from req.profile before returning
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  // updation code
  // TODO: work on updating password
  User.findByIdAndUpdate(
    { _id: req.profile._id }, // to find the user
    { $set: req.body }, // what we want to update
    { new: true, useFindAndModify: false }, // necessary parameters to be passed
    (err, user) => {
      if (err) {
        res.status(400).json({
          error: "You are not autherized to update this info",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Cart.find({ user: req.profile }) // FIXME: ._id??
    .populate("user", "_id name email")
    .exec((err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "No items in cart",
        });
      }
      res.json(cart);
    });
};

// middleware to add items in cart
exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.cart.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.cart.amount,
      transaction_id: req.body.cart.transaction_id,
    });
  });
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};
