const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

// Add to cart
router.post("/add", protect, addToCart);

// Get user's cart
router.get("/", protect, getCart);

// ✅ Update item quantity
router.put("/update", protect, updateCartItem);

// Remove item from cart
router.delete("/remove/:productId", protect, removeFromCart);

module.exports = router;
