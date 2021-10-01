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

const getRestaurant = async(request,response) => {
    try {
        Restaurant.findById(request.params.id, (error, data) => {
            if (error) {
                response.status(500).json({error: error.message});
            } else {
                response.status(200).json({
                    success: true,
                    restaurant: data
                })
            }
        })
    } catch (e) {
        console.log(e);
    }
}

const updateRestaurant = async (request,response) => {
    const restaurant = new Restaurant(request.body);

    console.log(restaurant);

    await Restaurant.findByIdAndUpdate(request.body._id,restaurant,
        (error,restaurant) => {
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

const deleteRestaurant = async (request,response) => {
    await Restaurant.findByIdAndRemove(request.params.id,(error,restaurant) => {
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
    })
}

module.exports = {
    getRestaurants,
    addRestaurant,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant
}
