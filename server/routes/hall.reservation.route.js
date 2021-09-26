const express = require('express');
const router = express.Router();

const hallReservationService = require('../services/hall.reservation.service');

module.exports = function () {
    router.post('/', hallReservationService.addHallReservation);
    router.get('/', hallReservationService.getHallReservation);
    router.get('/:id', hallReservationService.getHallReservations);
    router.put('/', hallReservationService.updateHallReservation);
    router.delete('/:id',hallReservationService.deleteHallReservation)

    return router;
}