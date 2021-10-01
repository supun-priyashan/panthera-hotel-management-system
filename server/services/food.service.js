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
        const foods = await Foods.find();
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
const getFood = async(request,response) => {
    try {
        Foods.findById(request.params.id, (error, data) => {
            if (error) {
                response.status(500).json({error: error.message});
            } else {
                response.status(200).json({
                    success: true,
                    food: data
                })
            }
        })
    } catch (e) {
        console.log(e);
    }
}

const updateFood = async (request,response) => {
    const food = new Foods(request.body);

    console.log(food);

    await Foods.findByIdAndUpdate(request.body._id,food,
        (error,food) => {
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

const deleteFood = async (request,response) => {
    await Foods.findByIdAndRemove(request.params.id,(error,food) => {
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
    })
}


module.exports = {
    addFoods,
    getFoods,
    deleteFood,
    updateFood,
    getFood
}
