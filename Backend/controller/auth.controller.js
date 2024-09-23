const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const JWT_SECRET = 'agri_connect)';

// POST: User Signup
const { validationResult } = require('express-validator');

const signup = async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, mobile, email, password, role } = req.body;

    try {
        let user = await User.findOne({
            $or: [{ mobile: mobile || null }, { email: email || null }]
        });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            name,
            mobile,
            email,
            role: role || 'farmer',
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, {
            expiresIn: '1h',
        });

        return res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                mobile: newUser.mobile,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const login = async (req, res) => {
    const { mobile, email, password, otp } = req.body;

    try {
        // Find user by mobile or email
        const user = await User.findOne({
            $or: [{ mobile: mobile || null }, { email: email || null }]
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Password-based login
        if (password) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        }

        // // OTP-based login
        // if (otp && otp !== user.otp) {
        //     return res.status(400).json({ message: 'Invalid OTP' });
        // }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                mobile: user.mobile,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { signup , login};
