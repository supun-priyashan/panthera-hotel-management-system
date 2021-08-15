const express = require('express');
const router = express.Router();

const ReceptionService = require('../services/hall.service');

module.exports = () => {
    router.get('/', ReceptionService.getHalls);
    router.post('/', ReceptionService.addHall);

    return router;
}
