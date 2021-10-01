//roomservice
const RoomReservation = require('../models/room.reservation.model');
const {request, response} = require("express");

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

    console.log(roomReservation);

    await roomReservation.save((error, data) => {
        if(error){
            console.log(error.message);
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

const getRoomReservations = async (request, response) => {

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

 const getRoomReservation = async(request,response) => {
     try {
         RoomReservation.findById(request.params.id, (error, data) => {
             if (error) {
                 response.status(500).json({error: error.message});
             } else {
                 response.status(200).json({
                     success: true,
                     roomReservation: data
                 })
             }
         })
     } catch (e) {
         console.log(e);
     }
 }

const updateRoomReservation = async (request,response) => {
    const roomReservation = new RoomReservation(request.body);

    console.log(roomReservation);

    await RoomReservation.findByIdAndUpdate(request.body._id,roomReservation,
        (error,room) => {
            if(error){
                response.status(500).json({ error: error.message });
            }
            else{
                response.status(200).
                json({
                    success: true,
                    roomReservation: roomReservation
                })
            }
        });
}

const deleteRoomReservation = async (request,response) => {
    await RoomReservation.findByIdAndRemove(request.params.id,(error,roomReservation) => {
        if(error){
            response.status(500).json({ error: error.message });
        }
        else{
            response.status(200).
            json({
                success: true,
                roomReservation: roomReservation
            })
        }
    })
}

module.exports = {
    addRoomReservation,
    getRoomReservations,
    getRoomReservation,
    updateRoomReservation,
    deleteRoomReservation
}
