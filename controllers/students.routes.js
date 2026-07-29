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




router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid Product id" });
    }

    const updates = { ...req.body };
    if (updates.category) {
      updates.category = updates.category.toLowerCase();
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
      context: "query",
    })
      .select("-__v")
      .lean();

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error("PUT /Productes/:id error", err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid Product id" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id)
      .select("-__v")
      .lean();

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted", product: deletedProduct });
  } catch (err) {
    console.error("DELETE /Productes/:id error", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router