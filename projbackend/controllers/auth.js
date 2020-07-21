const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body); // creating an instance(document) of User model
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

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  // findOne({email}) finds the email in the DB
  User.findOne({ email }, (err, user) => {
    // check if given email and password matches with those in the DB
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and Password did not match!",
      });
    }
    // After the email and password is verified, create a jwt which is saved in user's browser
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    // send response to front-end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user is signed out",
  });
};

// protecting routes
exports.isSignedIn = expressJwt({
  // next is not required coz its included in express-jwt
  secret: process.env.SECRET,
  // algorithms: ["HS256"],
  userProperty: "auth",
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id; //req.profile comes from frontend
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not Admin, ACCESS DENIED",
    });
  }
  next();
};
