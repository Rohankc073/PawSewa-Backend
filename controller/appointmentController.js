const Appointment = require("../model/appointment");

const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createAppointment };
