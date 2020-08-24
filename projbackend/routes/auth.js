const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signup, signout, signin, isSignedIn } = require("../controllers/auth");

// Validations are mentioned after the routes(eg. "/signup") and before the controller(eg. signup)
// In routers only checking of validation is done
router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 chars long"),
    check("email").isEmail().normalizeEmail().withMessage("Email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password field is required").isLength({ min: 6 }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/test", isSignedIn, (req, res) => {
  res.json(req.auth);
});
// we can add bearer token here

module.exports = router;
