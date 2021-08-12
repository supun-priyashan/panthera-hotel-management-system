const Room = require('../models/room.model');

const addRoom = async (request, response) => {

    const room = request.body;

    await room.save().
        then((data) => {
            response.status(200).
            json({
                success: true,
                room: data
            });
    }).catch((error) => {
        response.status(500).
        json({
            success: false,
            error: error
        });
    })
}

const getRooms = async (request, response) => {
    try{
        const rooms = Room.find();
        response.status(200).
            json({
            success: true,
            rooms: rooms
        })
    } catch (error) {
        response.status(404).json({ error: error });
    }
}

module.exports = {
    getRooms,
    addRoom
}
