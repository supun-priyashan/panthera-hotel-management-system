//roomroute
const express = require('express');
const router = express.Router();

const roomReservationService = require('../services/room.reservation.service');

module.exports = function () {
    router.post('/', roomReservationService.addRoomReservation);
    router.get('/', roomReservationService.getRoomReservations);
    router.get('/:id', roomReservationService.getRoomReservation);
    router.put('/', roomReservationService.updateRoomReservation);
    router.delete('/:id',roomReservationService.deleteRoomReservation)

    return router;
}