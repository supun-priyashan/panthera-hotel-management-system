const Employee = require('../models/employee.model');

const addEmployee = async (request, response) => {

    const employee = new Employee(request.body);

    await employee.save((error, employee) => {
        if(error){
            response.status(500).json({ error: error.message });
            console.log(error.message)
        }
        else{
            response.status(200).
            json({
                success: true,
                employee: employee
            })
        }
    });
}

const getEmployee = async (request, response) => {
    try{
        const employees = await Employee.find();
        response.status(200).
        json({
            success: true,
            employees: employees
        })
    } catch (error) {
        response.status(404).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    getEmployee,
    addEmployee
}
