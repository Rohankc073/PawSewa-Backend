const Cart = require('../model/cart');
const Product = require('../model/product');

// Add or update item in cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, message: 'Item added to cart', cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ View cart with populated product details (including image)
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const detailedItems = cart.items.map(item => {
      const product = item.productId; // ✅ declare the variable
      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        manufacturer: product.manufacturer,
        image: product.image, // ✅ includes image
        quantity: item.quantity
      };
    });

    res.status(200).json({ success: true, items: detailedItems });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Item removed", cart });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update quantity
const updateQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    const item = cart.items.find(i => i.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ success: true, message: 'Quantity updated', cart });
  } catch (error) {
    console.error("Update quantity error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity
};
