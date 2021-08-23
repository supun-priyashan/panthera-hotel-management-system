const Room = require('../models/room.model');

const addRoom = async (request, response) => {

    const room = new Room(request.body);

    await room.save((error, room) => {
        if(error){
            response.status(500).json({ error: error.message });
        }
        else{
            response.status(200).
            json({
                success: true,
                room: room
            })
        }
    });
}

const getRooms = async (request, response) => {
    try{
        const rooms = await Room.find();
        response.status(200).
            json({
            success: true,
            rooms: rooms
        })
    } catch (error) {
        response.status(404).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    getRooms,
    addRoom
}
