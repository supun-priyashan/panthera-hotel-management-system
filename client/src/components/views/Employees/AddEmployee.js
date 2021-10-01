import React, {useEffect, useState} from 'react';
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import {Button, Chip, Input, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import * as yup from "yup";
import {useFormik,Field} from "formik";
import styled from "styled-components";

const SubmitButton = styled.button`
  width: 120px;
  height: 40px;
  margin-left: 1rem;;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 15px;
  letter-spacing: 1.5px;
  font-weight: 500;
  color: #ffffff;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  text-align: center;

  &:hover {
    background-color: #5a2360;
    box-shadow: 0px 4px 12px rgba(72, 28, 76, 0.4);
    color: #fff;
    transform: translateY(-2px);
  }
`;
export const AddEmployee = () => {
    const validationSchema = yup.object({
        /*name: yup
            .string('Enter employee name')
            .required('Name is required'),
        type: yup
            .string('Select employee type')
            .required('Type is required'),
        gender: yup
            .string('Select gender type')
            .required('Gender is required'),
        dateOfBirth: yup
            .string('Enter the date of birth')
            .required('Date of birth is required'),
        permanentAddress: yup
            .string('Enter permanent address')
            .required('Permanent address is required'),
        nationalId: yup
            .string('Enter the National ID card number')
            .required('NIC is required'),
        phoneNumber: yup
            .string('Enter the phone number')
            .required('Phone number is required'),
        email: yup
            .string('Enter the email')
            .required('email is required'),*/

    });

    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            gender: '',
            dateOfBirth: '',
            permanentAddress: '',
            nationalID: '',
            phoneNumber: '',
            email: '',

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            const formData = new FormData();
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            const employees = {
                employeeName: values.name,
                type: values.type,
                gender: values.gender,
                dateOfBirth: values.dateOfBirth,
                permanentAddress: values.permanentAddress,
                nationalID: values.nationalID,
                phoneNumber: values.phoneNumber,
                email: values.email,
            }
            console.log("imageFile",employees);
            axios.post('http://localhost:8080/employees', employees)
                .then(response => {
                    if (response.data.success) {
                        alert('Employee  Successfully Added')

                    } else {
                        alert('Failed to add employee')
                    }

                }).catch(error => {
                    alert(error);
            })
            console.log("employees",values)
        },
    });
    useEffect(() => {
    }, [])
    return (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Employee Management
                <div className={'dashboard-subheader'}>
                    {/*TODO Align icon an route to go back*/}
                    <Icon style={{
                        color: '#5a2360',
                    }}>arrow_back_ios</Icon>
                    Add an Employee
                </div>
            </div>
            <div className={'main-container'}>
                <div className={'form-container'}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <InputLabel id="type">Type</InputLabel>
                        <TextField
                            fullWidth
                            labelId="type"
                            select
                            id="type"
                            name="type"
                            autoWidth
                            variant='outlined'
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            helperText={formik.touched.type && formik.errors.type}
                            style={{'marginTop': '10px'}}
                        >
                            <MenuItem value={1}>Event Planner</MenuItem>
                            <MenuItem value={2}>Executive Chef</MenuItem>
                            <MenuItem value={3}>Hotel General Manager</MenuItem>
                            <MenuItem value={4}>Waiter/Waitress</MenuItem>
                        </TextField>
                        <br/>
                        <InputLabel id="type">Gender</InputLabel>
                        <TextField
                            fullWidth
                            labelId="gender"
                            select
                            id="gender"
                            name="gender"
                            autoWidth
                            variant='outlined'
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                            helperText={formik.touched.gender && formik.errors.gender}
                            style={{'marginTop': '10px'}}
                        >
                            <MenuItem value={1}>Male</MenuItem>
                            <MenuItem value={2}>Female</MenuItem>

                        </TextField>
                        <TextField
                            fullWidth
                            id="dateOfBirth"
                            name="dateOfBirth"
                            label="DateOfBirth"
                            multiline
                            value={formik.values.dateOfBirth}
                            onChange={formik.handleChange}
                            /*error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}*/
                        />
                        <TextField
                            fullWidth
                            id="permanentAddress"
                            name="permanentAddress"
                            label="Permanentaddress"
                            multiline
                            value={formik.values.permanentAddress}
                            onChange={formik.handleChange}
                            error={formik.touched.permanentAddress && Boolean(formik.errors.permanentAddress)}
                            helperText={formik.touched.permanentAddress && formik.errors.permanentAddress}
                        />
                        <TextField
                            fullWidth
                            id="nationalID"
                            name="nationalID"
                            label="NationalID"
                            value={formik.values.nationalID}
                            onChange={formik.handleChange}
                            error={formik.touched.nationalID && Boolean(formik.errors.nationalID)}
                            helperText={formik.touched.nationalID && formik.errors.nationalID}
                        />
                        <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label="PhoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        <SubmitButton
                            style={{
                                float: 'right',
                                marginTop: '10px',
                                backgroundColor: '#5a2360',
                                fontFamily: 'Josefin Sans'
                            }}
                            type="submit"
                        >
                            Add Employee
                        </SubmitButton>
                    </form>


                </div>
                </div>
            </div>



   );
   };

export default AddEmployee;










