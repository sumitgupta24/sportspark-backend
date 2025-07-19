const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Add a product (for testing only, not protected)
router.post('/add', async (req, res) => {
  try {
    const { name, image, description, price, stock } = req.body;
    const product = await Product.create({ name, image, description, price, stock });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get product by ID
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

module.exports = router;
