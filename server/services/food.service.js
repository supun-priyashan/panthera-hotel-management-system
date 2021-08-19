const Foods = require('../models/food.model');

const addFoods = async (request, response) => {

    const food = new Foods(request.body);

    console.log(food);

    await food.save((error, food) => {
        if(error){
            response.status(500).json({ error: error.message });
        }
        else{
            response.status(200).
            json({
                success: true,
                food: food
            })
        }
    });
}

const getFoods = async (request, response) => {
    try{
        const foods = await Food.find();
        response.status(200).
        json({
            success: true,
            foods: foods
        })
    } catch (error) {
        response.status(404).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    addFoods,
    getFoods
}
