const User = require('../model/user'); // Ensure this points to the correct User model
const Cart = require('../model/cart');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto"); // To generate OTP
const WelcomeEmail = require('../templates/WelcomeEmail')
const transporter = require('../middleware/mailConfig');

const OTP_EXPIRY = 3600 * 1000; // 1 hour in milliseconds


// ✅ Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || "2h" }
    );
};

// ✅ Register a new user (Patient, Admin, or Doctor)
const registerUser = async (req, res) => {
    try {
        console.log("Received signup request:", req.body);

        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }



        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: role || "User",
        });

        //Create an empty cart for the user
        await Cart.create({userId: user._id, items: []});

        // Send registration email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Registration Successful. Welcome!",
            html: WelcomeEmail({ name: user.name }),
        };
        await transporter.sendMail(mailOptions);

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: { 
                id: user._id,  // ✅ Ensure ID is included
                name: user.name, 
                email: user.email, 
                role: user.role 
            }
        });

    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Login a user (Patient, Admin, or Doctor)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);

    

        // ✅ Log the response to debug issues
        console.log(" Login Response:", {
            success: true,
            message: "Login successful",
            token,
            user: {
                userId: user._id, // ✅ Ensure _id is included
                username: user.name,
                email: user.email,
                role: user.role
            },
            
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                _id: user._id, // ✅ Ensure _id is included
                name: user.name,
                email: user.email,
                role: user.role
            },
            // cart : cart || {userId: user._id,items:[]}
            
        });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};




module.exports = { registerUser, loginUser};
