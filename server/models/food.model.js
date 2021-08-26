const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodName: {type: String, required: true, trim: true},
    price: {type: Number, required: true},
    restaurantType: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    image: {type: String, default: ''}
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
