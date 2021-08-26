const express = require('express');
const router = express.Router();

const FoodService = require('../services/food.service');

module.exports = () => {
    router.get('/', FoodService.getFoods);
    router.post('/', FoodService.addFoods);

    return router;
}
