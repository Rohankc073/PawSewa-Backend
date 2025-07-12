const Appointment = require("../model/appointment");

// ✅ Create Appointment
const createAppointment = async (req, res) => {
  try {
    const { userId, ...rest } = req.body;

    const appointment = new Appointment({
      ...rest,
      userId,
    });

    await appointment.save();

    res.status(201).json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get Appointments by User ID (with doctor info)
const getAppointmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.find({ userId }).populate("doctorId");

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Fetch appointments error:", error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

module.exports = {
  createAppointment,
  getAppointmentsByUser,
};
