const Restaurant = require('../models/restaurant.model');

const addRestaurant = async (request, response) => {

    const restaurant = new Restaurant(request.body);

    console.log(restaurant);

    await restaurant.save((error, restaurant) => {
        if(error){
            response.status(500).json({ error: error.message });
        }
        else{
            response.status(200).
            json({
                success: true,
                restaurant: restaurant
            })
        }
    });
}

const getRestaurants = async (request, response) => {
    try{
        const restaurants = await Restaurant.find();
        response.status(200).
        json({
            success: true,
            restaurants: restaurants
        })
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
}

module.exports = {
    getRestaurants,
    addRestaurant
}
