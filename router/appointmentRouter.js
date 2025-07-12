const express = require("express");
const { createAppointment, getAppointmentsByUser } = require("../controller/appointmentController");

const router = express.Router();

router.post("/book", createAppointment);

// ✅ New route to fetch user's appointments
router.get("/user/:userId", getAppointmentsByUser);

module.exports = router;
