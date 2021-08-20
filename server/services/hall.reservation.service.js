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

module.exports = {
    addHallReservation,
    getHallReservation,
}
