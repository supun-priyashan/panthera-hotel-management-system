const express = require('express');
const router = express.Router();

const EmployeeService = require('../services/employee.service');

module.exports = () => {
    router.get('/', EmployeeService.getEmployee);
    router.post('/', EmployeeService.addEmployee);

    return router;
}