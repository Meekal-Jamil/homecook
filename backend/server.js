require('dotenv').config();
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

// Direct test route for menu (bypassing router)
app.get('/api/menu/today', async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const dishes = await Dish.find({ date: today });
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Debug route to check all registered routes
app.get('/debug', (req, res) => {
  const routes = [];
  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach(handler => {
        if (handler.route) {
          routes.push({
            path: '/api' + handler.route.path,
            methods: Object.keys(handler.route.methods)
          });
        }
      });
    }
  });
  res.json({ 
    message: 'Debug info',
    routes: routes,
    port: PORT,
    env: process.env.NODE_ENV
  });
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

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
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
