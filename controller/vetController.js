const Doctor = require('../model/vet');
const multer = require('multer');
const path = require('path');

// 📌 Multer setup for uploading doctor images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

/** ✅ Create a new vet */
const createDoctor = async (req, res) => {
  try {
    const { name, specialization, contact, email, experience, qualifications } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !specialization || !contact || !email || !experience || !qualifications) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newDoctor = new Doctor({
      name,
      specialization,
      experience,
      qualifications,
      contact,
      email,
      image,
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor created successfully", newDoctor });
  } catch (error) {
    res.status(400).json({ error: "Error creating doctor", details: error.message });
  }
};

/** ✅ Get all doctors */
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    const updatedDoctors = doctors.map((doc) => ({
      ...doc._doc,
      image: doc.image ? `http://localhost:5005/${doc.image}` : null,
    }));
    res.status(200).json(updatedDoctors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctors", details: error.message });
  }
};

/** ✅ Get doctor by ID */
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const updatedDoctor = {
      ...doctor._doc,
      image: doctor.image ? `http://localhost:5005/${doctor.image}` : null,
    };

    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctor", details: error.message });
  }
};

/** ✅ Update doctor */
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.image = req.file.path;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedDoctor) return res.status(404).json({ error: "Doctor not found" });

    res.status(200).json({ message: "Doctor updated successfully", updatedDoctor });
  } catch (error) {
    res.status(400).json({ error: "Error updating doctor", details: error.message });
  }
};

/** ✅ Delete doctor */
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedDoctor) return res.status(404).json({ error: "Doctor not found" });

    res.status(200).json({ message: "Doctor deleted successfully", deletedDoctor });
  } catch (error) {
    res.status(500).json({ error: "Error deleting doctor", details: error.message });
  }
};

/** ✅ Placeholder appointment controllers */
const getDoctorAppointments = async (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
};

const cancelDoctorAppointment = async (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
};

module.exports = {
  upload,
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorAppointments,
  cancelDoctorAppointment,
};
