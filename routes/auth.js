
const express = require('express');
const router = express.Router();

// Import controller - fix the path
const { register, login, forgotPassword, resetPassword } = require('./../backend/controllers/authController');

// Routes
router.post('/signup', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
