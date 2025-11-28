
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword 
        });
        
        await newUser.save();

        res.status(201).json({ 
            message: 'Registration successful! You can now login.' 
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        res.status(200).json({ 
            message: 'Login successful!', 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email 
            } 
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
        
        await user.save();

        res.status(200).json({ 
            message: 'Password reset token generated', 
            resetToken 
        });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        const user = await User.findOne({
            resetToken,
            resetTokenExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpire = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
