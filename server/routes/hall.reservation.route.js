const express = require('express');
const router = express.Router();

const hallReservationService = require('../services/hall.reservation.service');

module.exports = function () {
    router.post('/', hallReservationService.addHallReservation);
    router.get('/', hallReservationService.getHallReservation);

    return router;
}