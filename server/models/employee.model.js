const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeName: {type:String,required:true,trim:true},
    gender:{type:String,required:true},
    dateOfBirth:{type:String,required:true},
    permanentAddress: {type:String,required:true,trim:true},
    nationalID:{type:String,required:true,trim:true},
    type: {type:String,required:true,trim:true},
    phoneNumber:{type:Number,required:true},
    email:{type:String,required:true,trim:true}
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;


