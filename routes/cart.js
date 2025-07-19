const express = require('express');
const Cart = require('../models/Cart');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// ✅ POST /api/cart/add — Add item to cart
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      {
        $push: {
          items: {
            product: productId,
            quantity: quantity || 1,
          },
        },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: "✅ Added to cart", cart: updatedCart });
  } catch (err) {
    console.error("❌ Backend error:", err.message);
    return res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
});

// ✅ GET /api/cart — Get user's cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.product");

    if (!cart) return res.json({ items: [] });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ DELETE /api/cart/remove/:productId — Remove item by productId
router.delete("/remove/:productId", verifyToken, async (req, res) => {
  try {
    const { productId } = req.params;

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      {
        $pull: {
          items: { product: productId },
        },
      },
      { new: true }
    ).populate("items.product");

    return res.status(200).json({ message: "🗑️ Item removed", cart: updatedCart });
  } catch (err) {
    return res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
});

// ✅ PUT /api/cart/remove — (Alternative way via body)
router.put("/remove", verifyToken, async (req, res) => {
  const { productId } = req.body;
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      {
        $pull: {
          items: { product: productId },
        },
      },
      { new: true }
    ).populate("items.product");

    return res.json({ message: "✅ Removed using PUT", cart: updatedCart });
  } catch (err) {
    return res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
});

module.exports = router;
