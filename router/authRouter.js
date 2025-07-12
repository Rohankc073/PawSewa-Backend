const express = require('express');
const {registerUser,loginUser, resetPasswordRequest, resetPassword}= require('../controller/authController');

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

router.post("/reset-password-request", resetPasswordRequest); // Route for requesting a password reset
router.post("/reset-password", resetPassword);

module.exports = router;