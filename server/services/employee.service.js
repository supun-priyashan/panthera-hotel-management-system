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
//change
const updateEmployee = async(request,response) => {
    let userId = request.params.id;
    const {
        employeeName, gender, dateOfBirth, permanentAddress, nationalID, type, phoneNumber, email

    } = request.body;
    const updateemployee = {
        employeeName,
        gender,
        dateOfBirth,
        permanentAddress,
        nationalID,
        type,
        phoneNumber,
        email
    }
    const update = await Employee.findByIdAndUpdate(userId, updateemployee).then(() => {
        res.status(200).send({
            status: "user updated", user: update
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updated data"});

        })
    })
}
    const deleteEmployee = async (request, response) => {
        let userId = request.params.id;
        await Employee.findByIdAndDelete(userId).then(() => {
            res.status(200).send({status: "user deleted"});
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "error with delete user", error: err.message});
        })



}




module.exports = {
    getEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee

}
