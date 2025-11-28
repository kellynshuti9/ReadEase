
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const auth = require('../middleware/auth');

// Create booking
router.post('/', auth, async (req, res) => {
    try {
        const { carId, startDate, endDate, pickupLocation } = req.body;
        
        const car = await Car.findById(carId);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        const start = new Date(startDate);
        const end = new Date(endDate);
        const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalPrice = car.price * totalDays;

        const booking = new Booking({
            userId: req.user.id,
            carId,
            startDate: start,
            endDate: end,
            totalDays,
            totalPrice,
            pickupLocation
        });

        await booking.save();
        await booking.populate('carId');
        
        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking' });
    }
});

// Get user bookings
router.get('/my-bookings', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id })
            .populate('carId')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

module.exports = router;
