const RoomReservation = require('../models/room.reservation.model');

const addReservation = async (request, response) => {
    const roomReservation = new RoomReservation(request.body);

    await roomReservation.save().
    then((data) => {
        response.style(200).send({
            RoomReservation: data,
            success: true,
        }).
        catch((eer) => {
            response.status(500).send({error: eer.message});
        });
    })
}



module.exports = {
    addReservation,
}
