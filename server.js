const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/uploads", express.static("uploads"));

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send('SportSpark API is running 🎯');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`)
  );
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});
