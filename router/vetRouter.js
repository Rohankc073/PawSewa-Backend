const express = require('express');
const router = express.Router();

const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorAppointments,
  cancelDoctorAppointment,
  upload, // ✅ Make sure this is imported
} = require('../controller/vetController');

// 📌 Add new vet with image
router.post('/add', upload.single('image'), createDoctor);

// 📌 Get all vets
router.get('/all', getAllDoctors);

// 📌 Get vet by ID
router.get('/:id', getDoctorById);

// 📌 Update vet details (optional image)
router.put('/update/:id', upload.single('image'), updateDoctor);

// 📌 Delete vet
router.delete('/delete/:id', deleteDoctor);

// 📌 Get all appointments for vet
router.get('/:doctorId/appointments', getDoctorAppointments);

// 📌 Cancel an appointment
router.patch('/appointment/:appointmentId/cancel', cancelDoctorAppointment);

module.exports = router;

//Vet
//KK