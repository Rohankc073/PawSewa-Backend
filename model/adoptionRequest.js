const mongoose = require("mongoose");

const adoptionRequestSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "AdoptionPet" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: String,
  email: String,
  phone: String,
  address: String,
  capability: String, // Yes/No/Explanation
  housingType: String, // e.g., Apartment, House, Farm, etc.
  hasOtherPets: Boolean,
  experienceWithPets: String,
  reasonForAdoption: String,
  status: { type: String, default: "pending" }, // pending, accepted, declined
  visitDate: Date,
  visitLocation: String,
}, { timestamps: true });

module.exports = mongoose.model("AdoptionRequest", adoptionRequestSchema);
