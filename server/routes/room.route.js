const express = require('express');
const router = express.Router();

const RoomService = require('../services/room.service');

module.exports = () => {
    router.get('/', RoomService.getRooms);
    router.post('/', RoomService.addRoom);

    return router;
}
