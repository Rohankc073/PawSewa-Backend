const mongoose = require("mongoose");

const adoptionPetSchema = new mongoose.Schema({
  animalType: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: String },
  location: { type: String, required: true },
  color: { type: String },
  gender: { type: String },      // ⬅️ New field
  size: { type: String },        // ⬅️ New field
  description: { type: String },
  image: { type: String }, // Path to image file
  status: { type: String, default: "available" }, // available, pending, adopted
});

module.exports = mongoose.model("AdoptionPet", adoptionPetSchema);
