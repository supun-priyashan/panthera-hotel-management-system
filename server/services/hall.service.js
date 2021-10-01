const Hall = require('../models/hall.model');
const Room = require("../models/room.model");

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

const getHall = async(request,response) => {
    try {
        Hall.findById(request.params.id, (error, data) => {
            if (error) {
                response.status(500).json({error: error.message});
            } else {
                response.status(200).json({
                    success: true,
                    hall: data
                })
            }
        })
    } catch (e) {
        console.log(e);
    }
}

const updateHall = async (request,response) => {
    const hall = new Hall(request.body);

    console.log(hall);

    await Hall.findByIdAndUpdate(request.body._id,hall,
        (error,hall) => {
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

const deleteHall = async (request,response) => {
    await Hall.findByIdAndRemove(request.params.id,(error,hall) => {
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
    })
}

module.exports = {
    addHall,
    getHalls,
    getHall,
    updateHall,
    deleteHall
}
