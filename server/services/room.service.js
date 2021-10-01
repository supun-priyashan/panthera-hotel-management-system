const Room = require('../models/room.model');
const {request, response} = require("express");

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

const getRoom = async(request,response) => {
    console.log(request.params);
    try {
        Room.findById(request.params.id, (error, data) => {
            if (error) {
                response.status(500).json({error: error.message});
            } else {
                response.status(200).json({
                    success: true,
                    room: data
                })
            }
        })
    } catch (e) {
        console.log(e);
    }
}

const updateRoom = async (request,response) => {
    const room = new Room(request.body);

    console.log(room);

    await Room.findByIdAndUpdate(request.body._id,room,
        (error,room) => {
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

const deleteRoom = async (request,response) => {
    await Room.findByIdAndRemove(request.params.id,(error,room) => {
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
    })
}

module.exports = {
    getRooms,
    getRoom,
    addRoom,
    updateRoom,
    deleteRoom
}
