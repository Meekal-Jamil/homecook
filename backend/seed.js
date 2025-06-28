const mongoose = require('mongoose');
const Dish = require('./models/Dish');

const today = new Date().toISOString().slice(0, 10); 

// Use environment variable for MongoDB connection (same as server.js)
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://meekalstudent:oQXK0GM9PrnCZ4H7@cluster0.ufbe347.mongodb.net/homecook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  return Dish.deleteMany({ date: today }); 
}).then(() => {
  return Dish.insertMany([
    {
      name: "Biryani",
      price: 300,
      serves: 1,
      image: "biryani.png",
      date: "2025-06-30"
    },
    {
      name: "Zinger Burger",
      price: 250,
      serves: 1,
      image: "zinger.png",
      date: "2025-06-30"
    },
    {
      name: "Nihari",
      price: 350,
      serves: 2,
      image: "nihari.png",
      date: "2025-06-30"
    }
  ]);
}).then(() => {
  console.log("Seeding successful.");
  process.exit();
}).catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
