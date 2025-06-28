const express = require('express');
const router = express.Router();
const { getDishesByDay, addDish } = require('../controllers/dishController');

router.get('/:day', getDishesByDay);
router.post('/', addDish);

module.exports = router;
