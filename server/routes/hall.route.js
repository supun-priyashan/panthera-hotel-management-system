const express = require('express');
const router = express.Router();

const ReceptionService = require('../services/hall.service');
const RoomService = require("../services/room.service");

module.exports = () => {
    router.get('/', ReceptionService.getHalls);
    router.get('/:id', ReceptionService.getHall);
    router.post('/', ReceptionService.addHall);
    router.put('/', ReceptionService.updateHall);
    router.delete('/:id',ReceptionService.deleteHall)

    return router;
}
