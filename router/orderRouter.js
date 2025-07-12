const express = require("express");
const {
  placeOrder,
  getOrdersByUser,
} = require("../controller/orderController");

const router = express.Router();

router.post("/place", placeOrder);
router.get("/user/:userId", getOrdersByUser); // ✅ get orders of logged-in user

module.exports = router;
