
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    paymentMethod: { type: String, required: true }, // card, paypal, etc.
    paymentStatus: { type: String, default: 'Pending' }, // Pending, Completed, Failed, Refunded
    paymentIntentId: { type: String }, // Stripe Payment Intent ID
    transactionId: { type: String },
    customerEmail: { type: String, required: true },
    customerName: { type: String, required: true },
    
    // Card details (for demo - in production use payment processor)
    cardLast4: { type: String },
    cardBrand: { type: String },
    
    // Timestamps
    paidAt: { type: Date },
    refundedAt: { type: Date }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', PaymentSchema);
