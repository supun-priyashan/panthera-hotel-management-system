//This is the module for room reservation mongoose model
//room model
const mongoose = require('mongoose');

const roomReservationSchema = new mongoose.Schema({
    customerName: { type: String, required: true, trim: true },
    email: {  type: String, required: true, unique: true },
    contactNumber: { type: String, required: true, trim: true },
    roomName: { type: String, required: true, trim: true },
    noOfBeds: { type: Number, required: true },
    noOfGuests: { type: Number, required: true },
    arrivalDate: { type: Date, required: true },
    departureDate: { type: Date, required: true }

});

const RoomReservation = mongoose.model('RoomReservation', roomReservationSchema );

module.exports = RoomReservation;