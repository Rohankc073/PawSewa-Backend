const express = require("express");
const router = express.Router();
const esewaController = require("../controller/esewaController");

router.post("/initiate", esewaController.initiatePayment);
router.get("/success", esewaController.paymentSuccess);
router.get("/failure", esewaController.paymentFailure);

module.exports = router;
