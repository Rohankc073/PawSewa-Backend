const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity
} = require('../controller/cartController');

router.post('/add', addToCart);
router.get('/:userId', getCart);
router.delete('/remove', removeFromCart);
router.put('/update', updateQuantity);

module.exports = router;
