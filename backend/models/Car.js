
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    seats: { type: Number, required: true },
    transmission: { type: String, required: true },
    fuel: { type: String, required: true },
    available: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Car', CarSchema);
