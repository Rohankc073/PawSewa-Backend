const express = require("express");
const { createAppointment } = require("../controller/appointmentController");

const router = express.Router();

router.post("/book", createAppointment);

module.exports = router;
