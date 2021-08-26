const Hall = require('../models/hall.model');

const addHall = async (request, response) => {

    const hall = new Hall(request.body);

    await hall.save((error, hall) => {
        if(error){
            response.status(500).json({ error: error.message });
        }
        else{
            response.status(200).
            json({
                success: true,
                hall: hall
            })
        }
    });
}

const getHalls = async (request, response) => {
    try{
        const halls = await Hall.find();
        response.status(200).
        json({
            success: true,
            halls: halls
        })
    } catch (error) {
        response.status(404).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    addHall,
    getHalls
}
