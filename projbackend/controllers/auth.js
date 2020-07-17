const User = require("../models/user");
const { check, validationResult } = require("express-validator");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body); // creating user object from User model
  // Saving user model details to DB
  user.save((error, user) => {
    if (error) {
      res.status(400).json({
        error: "Not able to save user in DB",
      });
    }
    // displaying only required data, if only "user" is passed, all details will be printed
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "user signout",
  });
};
