// scripts/seedProducts.js (CommonJS version)
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();
  const products = [
  { name: "Cricket Bat", description: "English Willow Bat", price: 1500, stock: 15,
    imageUrl: "https://dkpcricketonline.com/cdn/shop/collections/image_419d887e-bcd5-4469-9925-776dc84db52b.heic?v=1735221459" },
  { name: "Football", description: "FIFA-approved ball", price: 1200, stock: 30,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO1Xy7iCwBYQUjG8YKgIk4f6wDtSC8obBR0Q&s" },
  { name: "Tennis Racket", description: "Graphite frame racket", price: 1800, stock: 25,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp8FMuvjWlFN8XzdX_zJjW5zlqcCuzMbHe5w&s" },
  { name: "Basketball", description: "Indoor/outdoor ball", price: 999, stock: 40,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDTU-qYReZj-6VpCMYTqH_Fq_LeMnmmn_GgQ&s" },
  { name: "Badminton Set", description: "2 rackets + net", price: 750, stock: 20,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGcdgaSJmlXPgrgTeaD64CjJEQ8g6lg2b54g&s" },
  { name: "Hockey Stick", description: "Pro hockey stick", price: 1299, stock: 10,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwcyAFYY8d-XYIQTrri3kMmrgeB0LJjseWCQ&s" },
  { name: "Boxing Gloves", description: "12oz leather gloves", price: 899, stock: 18,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW_YMaA_HN_Dbzo9-p-cS4XbFW1a2uY7BGng&s" },
  { name: "Skateboard", description: "Double kick deck", price: 1650, stock: 12,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-tyLWolOSEXnXi09wLbMWM8OtaFnT_2maEg&s" },
  { name: "Yoga Mat", description: "Eco-friendly 6mm", price: 599, stock: 50,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpk3CmnPcYTzTNukdEuBJdq0n_S8ViCe2dWA&s" },
  { name: "Running Shoes", description: "Breathable mesh", price: 2400, stock: 35,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVFLZWrVQoitYN8rry4hyUJjBmtsK-Uo2z1Q&s" },
  { name: "Dumbbell Set", description: "Adjustable 20kg", price: 2100, stock: 20,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6wUmDcotBiuSvxpbE5Z3K8UBTWINIzr_TmQ&s" },
  { name: "Table Tennis Kit", description: "2 paddles + balls", price: 490, stock: 15,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxCBPDBqBgbGg9gnVe2lUF-qK3wLVvDpeMfQ&s" },
  { name: "Skipping Rope", description: "Speed cardio rope", price: 199, stock: 60,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX0KdALrMS_r7yLUN3O6kytj40mhFXX_kGA&s" },
  { name: "Archery Bow", description: "Carbon fiber bow", price: 3999, stock: 8,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfY1txOmXc123e4VKeQozlINyq-c8S80vb7A&s" },
  { name: "Golf Club Set", description: "Beginner set", price: 7999, stock: 6,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFs5ByrhMceWYck-aE6i_O1BNk5lmj4HKN6g&s" },
  { name: "Volleyball", description: "Water-resistant ball", price: 550, stock: 28,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhDlUOvoaKjBOR9ujsP3P0pX9nCbNs3-HIlA&s" },
  { name: "Swimming Goggles", description: "Anti-fog UV", price: 250, stock: 40,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYJofd-3YM9HWK6Sa5U5NIzRGp-nBsF93ug&s" },
  { name: "Rugby Ball", description: "Match quality", price: 875, stock: 22,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStwY3U2YdYSpoSJhUE3ULPQdiY0cWJYHvzHw&s" },
  { name: "Baseball Bat", description: "Aluminium bat", price: 1100, stock: 14,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtGyhNH3l0NWya-jEBDm3YNG4XhJG3T-qYjA&s" },
  { name: "Fitness Tracker", description: "Heart rate monitor", price: 2999, stock: 30,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxKNDOBIjUNrKUIoURZEAKI6ToDZAFXb0OBg&s" },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    const inserted = await Product.insertMany(products);
    console.log(`✅ Inserted ${inserted.length} products`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error inserting products:", err.message);
    process.exit(1);
  }
};

seedProducts();
