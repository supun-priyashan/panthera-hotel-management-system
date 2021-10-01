const Employee = require('../models/employee.model');

const addEmployee = async (request, response) => {

    const employee = new Employee(request.body);

    console.log(employee);


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

const getEmployee = async(request,response) => {
    try {
        Employee.findById(request.params.id, (error, data) => {
            if (error) {
                response.status(500).json({error: error.message});
            } else {
                response.status(200).json({
                    success: true,
                    employee: data
                })
            }
        })
    } catch (e) {
        console.log(e);
    }
}
const getEmployees = async (request, response) => {

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

//change
const updateEmployee = async (request,response) => {
    const employee = new Employee(request.body);

    console.log(employee);

    await Employee.findByIdAndUpdate(request.body._id,employee,
        (error,employee) => {
            if(error){
                console.log(error);
                response.status(500).json({ error: error.message });
            }
            else{
                response.status(200).
                json({
                    success: true,
                    employee:employee
                })
            }
        });
}

const deleteEmployee = async (request,response) => {
    await Employee.findByIdAndRemove(request.params.id,(error,employee) => {
        if(error){
            response.status(500).json({ error: error.message });
        }
        else{
            response.status(200).
            json({
                success: true,
                employee: employee
            })
        }
    })
}




module.exports = {
    getEmployees,
    getEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee

}
