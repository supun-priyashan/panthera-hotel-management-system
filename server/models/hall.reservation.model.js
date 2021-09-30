//This is the module for hall reservation mongoose model
const mongoose = require('mongoose');

const hallReservationSchema = new mongoose.Schema({
    customerName: { type: String, required: true, trim: true },
    email: {  type: String, required: true, unique: true },
    contactNumber: { type: String, required: true, trim: true },
    hallName: { type: String, required: true, trim: true },
    eventType: { type: String, required: true, trim: true },
    noOfGuests: { type: Number, required: true },
    arrivalDate: { type: Date, required: true },
    departureDate: { type: Date, required: true }
});

const HallReservation = mongoose.model('HallReservation', hallReservationSchema );

module.exports = HallReservation;