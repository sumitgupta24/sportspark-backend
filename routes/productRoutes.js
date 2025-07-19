const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product"); // ✅ Important

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), async (req, res) => {
  const { name, description, price } = req.body;
  const imageUrl = `http://localhost:4000/uploads/${req.file.filename}`;

  try {
    const newProduct = new Product({ name, description, price, imageUrl });
    await newProduct.save();
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
  console.error("Upload failed:", err); // Full trace in terminal
  res.status(500).json({
    error: "Failed to add product",
    message: err.message,
    stack: err.stack,
  });
}

});

module.exports = router;
