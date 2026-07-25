const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");


router.get("/", async (req, res) => {
  try {

    const Productes = await Product.find()
      .select("-__v")
      .lean();

    res.json(Productes);
  } catch (err) {
    console.error("GET /Productes error", err);
    res.status(500).json({ error: err });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid Product id" });
    }

    const product = await Product.findById(id)
      .select("-__v")
      .lean();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("GET /Productes/:id error", err);
    res.status(500).json({ error: err });
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, description, category, price, quantity } = req.body;

    const product = new Product({ title, description, category: category.toLowerCase(), price, quantity });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error("POST /Productes error", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router