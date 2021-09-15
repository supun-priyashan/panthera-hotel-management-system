const express = require('express');
const router = express.Router();

const RoomService = require('../services/room.service');

module.exports = () => {
    router.get('/', RoomService.getRooms);
    router.get('/:id', RoomService.getRoom);
    router.post('/', RoomService.addRoom);
    router.put('/', RoomService.updateRoom);
    router.delete('/:id',RoomService.deleteRoom)

    return router;
}
