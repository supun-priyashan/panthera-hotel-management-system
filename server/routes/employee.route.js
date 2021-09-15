const express = require('express');
const router = express.Router();

const EmployeeService = require('../services/employee.service');

module.exports = () => {
    router.get('/', EmployeeService.getEmployee);
    router.post('/', EmployeeService.addEmployee);
    //change
    router.put('/update/:id', EmployeeService.updateEmployee);
    router.delete('/delete/:id', EmployeeService.deleteEmployee);
    return router;
}