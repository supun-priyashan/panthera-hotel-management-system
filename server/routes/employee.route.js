const express = require('express');
const router = express.Router();

const EmployeeService = require('../services/employee.service');

module.exports = () => {

    router.get('/', EmployeeService.getEmployees);
    router.get('/:id', EmployeeService.getEmployee);
    router.post('/', EmployeeService.addEmployee);
    //change
    router.put('/', EmployeeService.updateEmployee);
    router.delete('/:id',EmployeeService.deleteEmployee)

    return router;
}