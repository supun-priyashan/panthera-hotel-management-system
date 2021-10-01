import React, {useEffect, useState} from 'react';
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import {Button, Chip, IconButton, Input, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import * as yup from "yup";
import {useFormik,Field} from "formik";
import styled from "styled-components";
import {useHistory, useLocation} from "react-router-dom";
import { JumpCircleLoading } from 'react-loadingg';

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


export const EditHallReservations = (props) => {

    const [isLoading,setIsLoading] = useState(true);

    const [customerName,setCustomerName] = useState('');
    const [email,setEmail] = useState('');
    const [contactNumber,setContactNumber] = useState('');
    const [hallName,setHallName] = useState('');
    const [eventType, setEventType] = useState('');
    const [noOfGuests, setGuests] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [id, setId] = useState('');

    const history = useHistory();

    const data = history.location.state;

    useEffect(async () => {
        await axios.get('http://localhost:8080/hallReservations/'+props.match.params.id).
        then((response) => {
            if(response.data.success) {

                console.log(response.data.hallReservation);
                const data = response.data.hallReservation;

                setCustomerName(data.customerName);
                setEmail(data.email);
                setContactNumber(data.contactNumber);
                setHallName(data.hallName);
                setEventType(data.eventType);
                setGuests(data.noOfGuests);
                setArrivalDate(data.arrivalDate);
                setDepartureDate(data.departureDate);
                setId(data._id);

                setIsLoading(false);

            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])

    const validationSchema = yup.object({
        customerName: yup
            .string('Enter room name')
            .required('Name is required'),
        email: yup
            .string('Enter email')
            .required('Email is required'),
        contactNumber: yup
            .string('Enter contact number')
            .required('Contact Number is required'),
        hallName: yup
            .string('Select hall name')
            .required('Hall Name is required'),
        eventType: yup
            .string('Select event type')
            .required('Event Type is required'),
        noOfGuests: yup
            .number()
            .label('guests')
            .positive()
            .required('Guest count is required'),
        arrivalDate: yup
            .date('Select arrival date')
            .required('Arrival Date is required'),
        departureDate: yup
            .date('Select departure date')
            .required('Departure Date is required'),
    });

    const formik = useFormik({
        initialValues: {
            _id: id,
            customerName: customerName,
            email: email,
            contactNumber: contactNumber,
            hallName: hallName,
            eventType: eventType,
            noOfGuests: noOfGuests,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,

        onSubmit: (values) => {

            const formData = new FormData();
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            const hallReservation = {
                _id: id,
                customerName: values.customerName,
                email: values.email,
                contactNumber: values.contactNumber,
                hallName: values.hallName,
                eventType: values.eventType,
                noOfGuests: values.noOfGuests,
                arrivalDate: values.arrivalDate,
                departureDate: values.departureDate,

            }

            axios.put('http://localhost:8080/hallReservations', hallReservation)
                .then((response) => {
                    if (response.data.success) {
                        alert('Hall Details Successfully Updated')

                    } else {
                        alert('Failed to update')
                    }
                });

            // .then(response => {
            //     axios.post("http://localhost:8080/files",formData,config)
            //         .then(() => {
            //             if (response.data.success) {
            //                 alert('Room Details Successfully Updated')
            //
            //             } else {
            //                 alert('Failed to update')
            //             }
            //         }).catch((error) => {
            //         alert(error.message);
            //     });
            // })
        },
    });

    return isLoading ? (
        <div>
            <div className={'content'}>
                <div className={'dashboard-header'}>
                    Halls Reservation Management
                    <div className={'dashboard-subheader'}>
                        {/*TODO Align icon an route to go back*/}
                        <IconButton aria-label="back"
                                    onClick={() =>{
                                        history.goBack();
                                    }}>
                            <Icon style={{
                                color: '#5a2360',
                            }}>arrow_back_ios</Icon>
                        </IconButton>
                        Edit Hall Reservation Details
                    </div>
                </div>
                <div className={'main-container'}>
                    <div className={'form-container'}>
                        Loading...
                        <JumpCircleLoading
                            color ="#5a2360"
                            speed = {0.5}
                            size = "large"

                        />
                    </div>
                </div>
            </div>
        </div>
    ):(
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Halls Reservation Management
                <div className={'dashboard-subheader'}>
                    {/*TODO Align icon an route to go back*/}
                    <IconButton aria-label="back"
                                onClick={() =>{
                                    history.goBack();
                                }}>
                        <Icon style={{
                            color: '#5a2360',
                        }}>arrow_back_ios</Icon>
                    </IconButton>
                    Edit Hall Reservation Details
                </div>
            </div>
            <div className={'main-container'}>
                <div className={'form-container'}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="customerName"
                            name="customerName"
                            label="customerName"
                            value={formik.values.customerName}
                            onChange={formik.handleChange}
                            error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                            helperText={formik.touched.customerName && formik.errors.customerName}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id="contactNumber"
                            name="contactNumber"
                            label="contactNumber"
                            value={formik.values.contactNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                            helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                        />
                        <InputLabel id="type">Hall Name</InputLabel>
                        <TextField
                            labelId="hallName"
                            select
                            id="hallName"
                            name="hallName"
                            autoWidth
                            variant = 'outlined'
                            value={formik.values.hallName}
                            onChange={formik.handleChange}
                            error={formik.touched.hallName && Boolean(formik.errors.hallName)}
                            helperText={formik.touched.hallName && formik.errors.hallName}
                            style={{'marginTop': '10px'}}
                        >
                            <MenuItem value={'Grand Ballroom'}>Grand Ballroom</MenuItem>
                            <MenuItem value={'Imperial Ballroom'}>Imperial Ballroom</MenuItem>
                        </TextField>
                        <InputLabel id="type">Event Type</InputLabel>
                        <TextField
                            labelId="eventType"
                            select
                            id="eventType"
                            name="eventType"
                            autoWidth
                            variant = 'outlined'
                            value={formik.values.eventType}
                            onChange={formik.handleChange}
                            error={formik.touched.eventType && Boolean(formik.errors.eventType)}
                            helperText={formik.touched.eventType && formik.errors.eventType}
                            style={{'marginTop': '10px'}}
                        >
                            <MenuItem value={'Wedding'}>Wedding</MenuItem>
                            <MenuItem value={'Party'}>Party</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            id="noOfGuests"
                            name="noOfGuests"
                            label="noOfGuests"
                            type="noOfGuests"
                            value={formik.values.noOfGuests}
                            onChange={formik.handleChange}
                            error={formik.touched.noOfGuests && Boolean(formik.errors.noOfGuests)}
                            helperText={formik.touched.noOfGuests && formik.errors.noOfGuests}
                        />

                        <TextField
                            fullWidth
                            id="arrivalDate"
                            name="arrivalDate"
                            label="arrivalDate"
                            value={formik.values.arrivalDate}
                            onChange={formik.handleChange}
                            error={formik.touched.arrivalDate && Boolean(formik.errors.arrivalDate)}
                            helperText={formik.touched.arrivalDate && formik.errors.arrivalDate}
                        />
                        <TextField
                            fullWidth
                            id="departureDate"
                            name="departureDate"
                            label="departureDate"
                            value={formik.values.departureDate}
                            onChange={formik.handleChange}
                            error={formik.touched.departureDate && Boolean(formik.errors.departureDate)}
                            helperText={formik.touched.departureDate && formik.errors.departureDate}
                        />


                        <SubmitButton
                            style={{
                                float: 'right',
                                marginTop: '10px',
                                backgroundColor: '#5a2360',
                                fontFamily: 'Josefin Sans',
                                fontSize: '13px'
                            }}
                            type = "submit"
                        >
                            Save Changes
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </div>
    );
};
