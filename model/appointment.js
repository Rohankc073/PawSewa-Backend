const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to your user model
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  user: {
    firstName: { type: String },
    lastName: { type: String },
    mobileNumber: { type: String },
    email: { type: String },
    address: { type: String },
  },
  pet: {
    name: { type: String },
    type: { type: String },
    breed: { type: String },
    age: { type: String },
    illnessPeriod: { type: String },
    problem: { type: String },
  },
  schedule: {
    date: { type: Date },
    time: { type: String },
    clinic: { type: String },
  },
  payment: {
    method: { type: String },
    cardName: { type: String },
    cardNumber: { type: String },
    expiry: { type: String },
    cvv: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
