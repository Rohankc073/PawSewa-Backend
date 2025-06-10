const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    name :{type:String,required: true},
    email: {type:String,required: true},
    password: {type:String,required: true},
    phone: {type:String,required: true},
    role : {type:String,enum: ["Admin","Vet","User"],defult:"User"},

});

// Encrypt password using bcrypt before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Generate JWT Token for authentication
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE, // Example: "30d"
    });
};

const User = mongoose.model('User',userSchema);
module.exports = User;
