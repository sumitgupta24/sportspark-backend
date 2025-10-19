const express = require('express');
const Cart = require('../models/Cart');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// A helper function to get a populated cart
const getPopulatedCart = (userId) => {
    return Cart.findOne({ userId }).populate("items.product");
};

// ✅ [FIXED] POST /api/cart/add — Solves the duplicate item problem.
router.post("/add", verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(p => p.product.toString() === productId);

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity || 1;
        } else {
            cart.items.push({ product: productId, quantity: quantity || 1 });
        }

        await cart.save();
        const populatedCart = await getPopulatedCart(userId);
        res.status(200).json(populatedCart);

    } catch (err) {
        console.error("❌ Backend /add error:", err.message);
        res.status(500).json({ message: "Failed to add to cart" });
    }
});

// ✅ [NEW & ESSENTIAL] PUT /api/cart/update — Solves the +/- button problem.
router.put("/update", verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (quantity < 1) {
        // If quantity is less than 1, remove the item
        return router.put('/remove', verifyToken)(req, res);
    }

    try {
        await Cart.updateOne(
            { userId, "items.product": productId },
            { $set: { "items.$.quantity": quantity } }
        );
        const populatedCart = await getPopulatedCart(userId);
        res.status(200).json(populatedCart);

    } catch (err) {
        console.error("❌ Backend /update error:", err.message);
        res.status(500).json({ message: "Failed to update quantity" });
    }
});

// ✅ GET /api/cart — Fetches the user's cart.
router.get("/", verifyToken, async (req, res) => {
    try {
        const cart = await getPopulatedCart(req.user.id);
        if (!cart) return res.json({ items: [] });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ [FIXED] PUT /api/cart/remove — Solves the "cart gets empty" problem.
router.put("/remove", verifyToken, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;
    try {
        await Cart.updateOne(
            { userId },
            { $pull: { items: { product: productId } } }
        );
        const populatedCart = await getPopulatedCart(userId);
        res.status(200).json(populatedCart);
    } catch (err) {
        res.status(500).json({ message: "Failed to remove item" });
    }
});

module.exports = router;