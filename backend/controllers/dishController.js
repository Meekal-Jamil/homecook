const Dish = require('../models/Dish');

const getDishesByDay = async (req, res) => {
  try {
    const dishes = await Dish.find({ date: req.params.day });
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addDish = async (req, res) => {
  try {
    const dish = new Dish(req.body);
    await dish.save();
    res.status(201).json(dish);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getDishesByDay, addDish };
