const Transaction = require("../model/Transaction");
require("dotenv").config();

exports.initiatePayment = async (req, res) => {
  try {
    const { petId, userId, amount } = req.body;

    const transaction = await Transaction.create({
      petId,
      userId,
      amount,
    });

    const paymentData = {
      amount,
      failure_url: process.env.ESEWA_FAILURE_URL,
      product_delivery_charge: 0,
      product_service_charge: 0,
      product_code: "EPAYTEST",
      signature: "",
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: process.env.ESEWA_SUCCESS_URL,
      total_amount: amount,
      transaction_uuid: transaction._id.toString(),
    };

    const formHtml = `
      <form id="esewaForm" action="${process.env.ESEWA_PAY_URL}" method="POST">
        ${Object.entries(paymentData)
          .map(([key, val]) => `<input type="hidden" name="${key}" value="${val}" />`)
          .join("")}
      </form>
      <script>document.getElementById('esewaForm').submit();</script>
    `;

    res.send(formHtml);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to initiate payment" });
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    const encoded = req.query.data;
    const decoded = Buffer.from(encoded, "base64").toString();
    const payload = JSON.parse(decoded);

    const { transaction_uuid } = payload;

    await Transaction.findByIdAndUpdate(transaction_uuid, {
      status: "COMPLETE",
    });

    res.redirect("http://localhost:5173/payment-success"); // frontend success page
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Payment verification failed" });
  }
};

exports.paymentFailure = async (req, res) => {
  try {
    const txId = req.query.transaction_uuid;
    await Transaction.findByIdAndUpdate(txId, { status: "FAILED" });
    res.redirect("http://localhost:5173/payment-failure"); // frontend failure page
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failure callback failed" });
  }
};
