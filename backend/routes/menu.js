const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish");

router.get("/today", async (req, res) => {
  const today = new Date().getDay();              //0 for Sunday, 6 for Saturday
  try {
    const dishes = await Dish.find({ day: today });
    if (!dishes.length) {
      return res.status(404).json({ message: "No menu available today." });
    }
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newDish = new Dish(req.body); 
    await newDish.save();
    res.status(201).json({ message: "Dish added successfully", newDish });
  } catch (err) {
    console.error("Error adding dish:", err);
    res.status(500).json({ error: "Failed to add dish" });
  }
});

module.exports = router;
