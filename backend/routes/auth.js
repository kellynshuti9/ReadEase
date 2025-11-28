const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async (req,res) => {
    const {name,email,password} = req.body;
    const hashed = await bcrypt.hash(password,10);
    const user = new User({name,email,password:hashed});
    await user.save();
    res.json({message:'User registered'});
});

// Login
router.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:'Invalid email'});
    const valid = await bcrypt.compare(password,user.password);
    if(!valid) return res.status(400).json({message:'Invalid password'});
    res.json({message:'Login success', userId:user._id});
});

module.exports = router;
