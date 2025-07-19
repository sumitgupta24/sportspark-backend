const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }, // optional
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imageUrl: String,
});

module.exports = mongoose.model('Product', productSchema);
