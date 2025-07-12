const Adoption = require("../model/AdoptionPet");
const AdoptionRequest = require("../model/adoptionRequest");
const User = require("../model/user");

// Add a pet for adoption (form-data with image)
const addPet = async (req, res) => {
  try {
    const {
      animalType,
      breed,
      age,
      height,
      location,
      color,
      description,
      gender,       // ⬅️ Extract new field
      size          // ⬅️ Extract new field
    } = req.body;

    const image = req.file ? `uploads/${req.file.filename}` : "";

    const pet = await Adoption.create({
      animalType,
      breed,
      age,
      height,
      location,
      color,
      description,
      gender,       // ⬅️ Include new field
      size,         // ⬅️ Include new field
      image,
    });

    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ message: "Failed to add pet", error: err.message });
  }
};

// Get all pets available for adoption
const getAllPets = async (req, res) => {
  try {
    const pets = await Adoption.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pets", error: err.message });
  }
};

// Submit adoption request
const requestAdoption = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const request = await AdoptionRequest.create({
      petId: req.body.petId,
      userId: user._id,
      fullName: user.name,
      email: user.email,
      phone: req.body.phone,
      address: req.body.address,
      capability: req.body.capability,
      housingType: req.body.housingType,
      hasOtherPets: req.body.hasOtherPets,
      experienceWithPets: req.body.experienceWithPets,
      reasonForAdoption: req.body.reasonForAdoption,
      status: "pending"
    });

    res.status(201).json({ message: "Adoption request submitted", request });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit request", error: err.message });
  }
};

// Get all adoption requests (admin)
const getAllRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find().populate("petId userId");
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests", error: err.message });
  }
};

// ✅ Get adoption requests by user ID (for logged-in users)
const getRequestsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const requests = await AdoptionRequest.find({ userId }).populate("petId");
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user requests", error: err.message });
  }
};


// Update request status (admin approval or rejection)
const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, visitDate, visitLocation } = req.body;

    const request = await AdoptionRequest.findByIdAndUpdate(
      id,
      { status, visitDate, visitLocation },
      { new: true }
    );

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Request updated", request });
  } catch (err) {
    res.status(500).json({ message: "Failed to update request", error: err.message });
  }
};

module.exports = {
  addPet,
  getAllPets,
  requestAdoption,
  getAllRequests,
  updateRequestStatus,
  getRequestsByUser
};
