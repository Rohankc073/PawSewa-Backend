const Product = require('../model/product');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// 📌 Configure Multer for Image Upload (Same as Doctor Controller)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store images in 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

/** 
 * ✅ Add a new product (Medicine)
 * - Ensures the image is stored correctly in the same `/uploads/` directory
 */
const addProduct = async (req, res) => {
    try {
        // Destructure fields including the category from req.body
        const { name, manufacturer, price, quantity, category, description } = req.body;

        // Ensure image is stored correctly
        const image = req.file ? req.file.path : null;

        // Create a new product document
        const product = new Product({
            name,
            manufacturer,
            price,
            quantity,
            category,  // Ensure category is added
            description,
            image,
        });

        // Save the product to the database
        await product.save();

        // Send success response
        res.status(201).json({ message: '✅ Product added successfully', product });
    } catch (error) {
        // Handle error and send a bad request response
        res.status(400).json({ error: error.message });
    }
};


/** 
 * ✅ Fetch all medicines (Ensure image URL is correct)
 */
const getProducts = async (req, res) => {
  try {
    const { category, brand, min, max, sort } = req.query;

    const query = {};

    // Filter by category
    if (category) {
      const categoryList = category.split(",");
      query.category = { $in: categoryList };
    }

    // Filter by brand (manufacturer)
    if (brand) {
      const brandList = brand.split(",");
      query.manufacturer = { $in: brandList };
    }

    // Price range
    if (min || max) {
      query.price = {};
      if (min) query.price.$gte = parseFloat(min);
      if (max) query.price.$lte = parseFloat(max);
    }

    // Sort logic
    let sortOption = { createdAt: -1 }; // Default: latest
    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };

    // Fetch filtered + sorted
    const products = await Product.find(query)
      .populate("category", "name")
      .sort(sortOption);

    // Return full image URL
    const updatedProducts = products.map((product) => ({
      ...product._doc,
      image: product.image ? `http://localhost:5005/${product.image}` : null,
    }));

    res.status(200).json(updatedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
};


/** 
 * ✅ Fetch a single product by ID
 */
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Populate category name
        const product = await Product.findById(id).populate('category', 'name');
        if (!product) return res.status(404).json({ message: '❌ Product not found' });

        // ✅ Ensure full image URL
        const updatedProduct = {
            ...product._doc,
            image: product.image ? `http://localhost:5005/${product.image}` : null,
        };

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




/** 
 * ✅ Update a product
 * - Updates product details, including image.
 */
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name,manufacturer, price, quantity, category, description } = req.body;

        let updatedData = { name, manufacturer, price, quantity, category, description };

        // ✅ If a new image is uploaded, update the image path
        if (req.file) {
            updatedData.image = req.file.path;
        }

        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        if (!product) return res.status(404).json({ message: '❌ Product not found' });

        res.status(200).json({ message: '✅ Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** 
 * ✅ Delete a product
 * - Removes the product record and deletes the image from the server.
 */
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure product exists before deleting
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: '❌ Product not found' });
        }

        // ✅ Delete the product image from the server if it exists
        if (product.image) {
            const imagePath = path.join(__dirname, '..', product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Delete file safely
            }
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: '✅ Product deleted successfully' });

    } catch (error) {
        console.error("❌ Delete Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct, getProductById, upload };
