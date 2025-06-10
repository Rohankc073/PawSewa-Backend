const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },  // ✅ Reference Category model
    image: { type: String, default: null },
    description: { type: String },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
