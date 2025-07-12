const express = require('express');
const {addProduct,getProducts, upload,getProductById}= require('../controller/productController');

const router = express.Router();

// Add Product route
router.post('/add', upload.single('image'),addProduct);
router.get("/get",getProducts)
router.get('/:id', getProductById);


module.exports = router;

//Product 