const express = require('express');
const router = express.Router();

const FoodService = require('../services/food.service');

module.exports = () => {
    router.get('/', FoodService.getFoods);
    router.post('/', FoodService.addFoods);
    router.get('/:id', FoodService.getFood);
    router.put('/', FoodService.updateFood);
    router.delete('/:id',FoodService.deleteFood)

    return router;
}
