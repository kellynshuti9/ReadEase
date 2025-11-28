
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' }, // Pending, Confirmed, Cancelled
    pickupLocation: { type: String, default: 'Main Office' },
    
    // Payment fields
    paymentStatus: { type: String, default: 'Pending' }, // Pending, Paid, Failed, Refunded
    paymentMethod: { type: String }, // card, paypal, etc.
    paymentId: { type: String }, // Payment processor ID (Stripe, etc.)
    paymentDate: { type: Date },
    
    // Customer details for payment
    customerName: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);
