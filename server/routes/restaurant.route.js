const express = require('express');
const router = express.Router();

const RestaurantService = require('../services/restaurant.service');

module.exports = () => {
    router.get('/', RestaurantService.getRestaurants);
    router.post('/', RestaurantService.addRestaurant);
    router.get('/:id', RestaurantService.getRestaurant);
    router.put('/', RestaurantService.updateRestaurant);
    router.delete('/:id',RestaurantService.deleteRestaurant)

    return router;
}
