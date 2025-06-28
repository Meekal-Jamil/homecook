const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const menuRoutes = require('./routes/menu');     
const dishRoutes = require('./routes/dishes');   
const orderRoutes = require('./routes/orders');
const Dish = require('./models/Dish');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'HomeCook Backend API is running!' });
});

// Test route to check database
app.get('/test', async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const allDishes = await Dish.find({});
    const todayDishes = await Dish.find({ date: today });
    res.json({ 
      message: 'Database test',
      today: today,
      allDishes: allDishes,
      todayDishes: todayDishes,
      totalDishes: allDishes.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MongoDB connection (will be updated for cloud database)
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://meekalstudent:oQXK0GM9PrnCZ4H7@cluster0.ufbe347.mongodb.net/homecook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/menu', menuRoutes);     
app.use('/api/dishes', dishRoutes);   
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
