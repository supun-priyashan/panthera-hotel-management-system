const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    hallName: {type: String, required: true, trim: true},
    type: {type: String, required: true, trim: true},
    space: {type: Number, required: true},
    guests: {type: Number, required: true},
    height: {type: Number, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true, trim: true},
    facilities: {type: Array, required: true},
    events: {type: Array, required: true},
    image: {type: String, default: ''}
});

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;
