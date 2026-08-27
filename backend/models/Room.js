const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
    type: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model('Room', roomSchema);