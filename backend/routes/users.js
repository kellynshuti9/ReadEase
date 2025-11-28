
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, phone, address, licenseNumber } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, phone, address, licenseNumber },
            { new: true }
        ).select('-password');
        res.json({ message: 'Profile updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
});

module.exports = router;
