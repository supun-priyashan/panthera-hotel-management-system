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

const facilitiesSet = ['TV','Ensuite Bathroom','Balcony','Mini fridge','WiFi'];

export const EditRoomReservations = (props) => {

    const [isLoading,setIsLoading] = useState(true);

    const [customerName,setCustomerName] = useState('');
    const [email,setEmail] = useState('');
    const [contactNumber,setContactNumber] = useState('');
    const [roomName,setRoomName] = useState('');
    const [noOfBeds, setBeds] = useState('');
    const [noOfGuests, setGuests] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [id, setId] = useState('');

    const history = useHistory();

    const data = history.location.state;

    useEffect(async () => {
        await axios.get('http://localhost:8080/roomReservations/'+props.match.params.id).
        then((response) => {
            if(response.data.success) {

                console.log(response.data.roomReservation);
                const data = response.data.roomReservation;

                setCustomerName(data.customerName);
                setEmail(data.email);
                setContactNumber(data.contactNumber);
                setRoomName(data.roomName);
                setBeds(data.noOfBeds);
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
        roomName: yup
            .string('Select room name')
            .required('Room Name is required'),
        noOfBeds: yup
            .number()
            .label('beds')
            .positive()
            .required('Bed count is required'),
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
            roomName: roomName,
            noOfBeds: noOfBeds,
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

            const roomReservation = {
                _id: id,
                customerName: values.customerName,
                email: values.email,
                contactNumber: values.contactNumber,
                roomName: values.roomName,
                noOfBeds: values.noOfBeds,
                noOfGuests: values.noOfGuests,
                arrivalDate: values.arrivalDate,
                departureDate: values.departureDate,

            }

            axios.put('http://localhost:8080/roomReservations', roomReservation)
                .then((response) => {
                if (response.data.success) {
                    alert('Room Details Successfully Updated')

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
                    Rooms & Suite Reservation Management
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
                        Edit Room Reservation Details
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
                Rooms & Suite Reservation Management
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
                    Edit Room Reservation Details
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
                        <InputLabel id="type">Room Name</InputLabel>
                        <TextField
                            labelId="roomName"
                            select
                            id="roomName"
                            name="roomName"
                            autoWidth
                            variant = 'outlined'
                            value={formik.values.roomName}
                            onChange={formik.handleChange}
                            error={formik.touched.roomName && Boolean(formik.errors.roomName)}
                            helperText={formik.touched.roomName && formik.errors.roomName}
                            style={{'marginTop': '10px'}}
                        >
                            <MenuItem value={'deluxe double'}>deluxe double</MenuItem>
                            <MenuItem value={'Florence'}>Florence</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            id="noOfBeds"
                            name="noOfBeds"
                            label="noOfBeds"
                            type="number"
                            value={formik.values.noOfBeds}
                            onChange={formik.handleChange}
                            error={formik.touched.noOfBeds && Boolean(formik.errors.noOfBeds)}
                            helperText={formik.touched.noOfBeds && formik.errors.noOfBeds}
                        />
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
