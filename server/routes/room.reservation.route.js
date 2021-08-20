const express = require('express');
const router = express.Router();

const roomReservationService = require('../services/room.reservation.service');

module.exports = function () {
    router.post('/', roomReservationService.addRoomReservation);
    router.get('/', roomReservationService.getRoomReservation);

    return router;
}