const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/product");

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

// actual routes
// Create products by Admin
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// Read products
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo); // for performance optimiztion photo is taken via middleware

// Update
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// Delete
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// listing route
router.get("/products", getAllProducts);

module.exports = router;
