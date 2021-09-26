const HallReservation = require('../models/hall.reservation.model');

const addHallReservation = async (request, response) => {

    const hallReservation = new HallReservation(request.body);

    await hallReservation.save((error, data) => {
        if(error){
            response.status(500).json({ error: error.message });
        }
        else{
            response.status(200).
            json({
                success: true,
                hallReservation: data
            })
        }
    });
}

const getHallReservation = async (request, response) => {

    try{
        const hallReservations = await HallReservation.find();
        response.status(200).
        json({
            success: true,
            hallReservations: hallReservations
        })
    }
    catch(error) {
        response.status(404).json({ error: error.message });
    }
}

const getHallReservations = async(request,response) => {
    try {
        HallReservation.findById(request.params.id, (error, data) => {
            if (error) {
                response.status(500).json({error: error.message});
            } else {
                response.status(200).json({
                    success: true,
                    hallReservation: data
                })
            }
        })
    } catch (e) {
        console.log(e);
    }
}

const updateHallReservation = async (request,response) => {
    const hallReservation = new HallReservation(request.body);

    console.log(hallReservation);

    await HallReservation.findByIdAndUpdate(request.body._id,hallReservation,
        (error,room) => {
            if(error){
                response.status(500).json({ error: error.message });
            }
            else{
                response.status(200).
                json({
                    success: true,
                    hallReservation: hallReservation
                })
            }
        });
}

const deleteHallReservation = async (request,response) => {
    await HallReservation.findByIdAndRemove(request.params.id,(error,hallReservation) => {
        if(error){
            response.status(500).json({ error: error.message });
        }
        else{
            response.status(200).
            json({
                success: true,
                hallReservation: hallReservation
            })
        }
    })
}

module.exports = {
    addHallReservation,
    getHallReservation,
    getHallReservations,
    updateHallReservation,
    deleteHallReservation,
}
