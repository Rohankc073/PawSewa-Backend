const Cart = require("../model/cart");
const Product = require("../model/product")


const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            name: product.name,
            price: product.price,
            image: `http://localhost:5005/${product.image}`, // ✅ Ensure full URL
            description: product.description,
            quantity,
          },
        ],
      });
    } else {
      const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

      if (productIndex > -1) {
        cart.items[productIndex].quantity += quantity;
      } else {
        cart.items.push({
          productId,
          name: product.name,
          price: product.price,
          image: `http://localhost:5005/${product.image}`, // ✅ Ensure full URL
          description: product.description,
          quantity,
        });
      }
    }

    await cart.save();
    res.status(201).json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports 