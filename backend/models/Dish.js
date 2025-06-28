const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  serves: Number,
  date: String
});

module.exports = mongoose.model('Dish', dishSchema);
