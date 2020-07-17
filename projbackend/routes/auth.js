const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signup, signout, signin } = require("../controllers/auth");

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
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 chars long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email is required"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password field is required"),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
