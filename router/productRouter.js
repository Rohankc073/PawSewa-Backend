const express = require('express');
const {addProduct,getProducts, upload}= require('../controller/productController');

const router = express.Router();

// Add Product route
router.post('/add', upload.single('image'),addProduct);
router.get("/get",getProducts)

module.exports = router;