const express = require('express');
const Authrouter = express.Router();
const { signup,login } = require('../controller/auth.controller');

// POST: Signup route
Authrouter.post('/auth/signup', signup);
Authrouter.post('/auth/signin',login)

module.exports = Authrouter;
