const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // ✅ Import multer middleware
const adoptionController = require("../controller/adoptionController");

// ✅ Add pet for adoption (with form-data and image)
router.post("/add", upload.single("image"), adoptionController.addPet);

// Get all pets available
router.get("/all", adoptionController.getAllPets);

// Submit an adoption request
router.post("/request", adoptionController.requestAdoption);

// Get all requests (admin)
router.get("/requests", adoptionController.getAllRequests);

// Update request status (admin)
router.put("/request/:id", adoptionController.updateRequestStatus);

router.get("/user/:userId", adoptionController.getRequestsByUser);

module.exports = router;
