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
                HallReservation: data
            })
        }
    });
}

const getHallReservation = async (request, response) => {

    try{
        const hallReservation = await HallReservation.find();
        response.status(200).
        json({
            success: true,
            HallReservation: hallReservation
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
