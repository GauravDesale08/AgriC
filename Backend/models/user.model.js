const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mobile: { type: String, unique: true, required: false },
    email: { type: String, unique: true, required: false },
    password: { type: String, required: true },
    otp: { type: String, required: false }, // For OTP-based login
    role: { type: String, enum: ['farmer', 'buyer', 'admin'], default: 'farmer' },
    // Other user-specific fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
