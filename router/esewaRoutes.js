const express = require("express");
const router = express.Router();
const axios = require("axios");
const crypto = require("crypto");

function generateHmac(data) {
  return crypto.createHmac("sha256", process.env.SECRET).update(data).digest("base64");
}

router.post("/initiate", async (req, res) => {
  const { amount, transactionId } = req.body;

  const data = `total_amount=${amount},transaction_uuid=${transactionId},product_code=${process.env.MERCHANT_ID}`;
  const signature = generateHmac(data);

  try {
    const response = await axios.post(process.env.ESEWA_PAYMENT_URL, null, {
      params: {
        total_amount: amount,
        transaction_uuid: transactionId,
        product_code: process.env.MERCHANT_ID,
        success_url: process.env.SUCCESS_URL,
        failure_url: process.env.FAILURE_URL,
        signature,
      },
    });

    return res.json({ url: response.request.res.responseUrl });
  } catch (err) {
    console.error("eSewa error response:", err.response?.data || err.message);
    res.status(500).json({ error: "Payment initiation failed" });
  }
});


module.exports = router;
