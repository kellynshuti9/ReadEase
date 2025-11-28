
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' }, 
    pickupLocation: { type: String, default: 'Main Office' },
    
    
    paymentStatus: { type: String, default: 'Pending' }, 
    paymentMethod: { type: String }, 
    paymentId: { type: String }, 
    paymentDate: { type: Date },
    
    
    customerName: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);
