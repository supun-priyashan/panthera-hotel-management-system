const RoomReservation = require('../models/room.reservation.model');

/*const addReservation = async (request, response) => {

    const roomReservation = new RoomReservation(request.body);

    console.log(roomReservation);

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
}*/

const addRoomReservation = async (request, response) => {

    const roomReservation = new RoomReservation(request.body);

    await roomReservation.save((error, data) => {
        if(error){
            response.status(500).json({ error: error.message });
        }
        else{
            response.status(200).
            json({
                success: true,
                roomReservation: data
            })
        }
    });
}

const getRoomReservation = async (request, response) => {

    try{
        const roomReservations = await RoomReservation.find();
        response.status(200).
            json({
            success: true,
            roomReservations: roomReservations
        })
    }
    catch(error) {
        response.status(404).json({ error: error.message });
    }
}

module.exports = {
    addRoomReservation,
    getRoomReservation,
}
