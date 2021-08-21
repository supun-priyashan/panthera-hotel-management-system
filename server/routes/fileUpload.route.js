const express = require('express');
const router = express.Router();

const uploadService = require('../services/fileupload.service');

module.exports = function(){

    router.post('/', uploadService.uploadFile);

    return router;
}
