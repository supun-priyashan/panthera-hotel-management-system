const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    type: {type: String, required: true, trim: true},
    space: {type: Number, required: true},
    guests: {type: Number, required: true},
    beds: {type: Number, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true, trim: true},
    facilities: {type: Array, required: true},
    image: {type: String, default: null}
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
