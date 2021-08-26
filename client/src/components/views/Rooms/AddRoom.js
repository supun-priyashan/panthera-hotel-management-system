import React, {useEffect, useState} from 'react';
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import {Button, Chip, IconButton, Input, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import * as yup from "yup";
import {useFormik,Field} from "formik";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

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

export const AddRoom = () => {

    const [imageFile,setImageFile] = useState();

    const history = useHistory();

    const validationSchema = yup.object({
        name: yup
            .string('Enter room name')
            .required('Name is required'),
        type: yup
            .string('Select room type')
            .required('Type is required'),
        space: yup
            .number()
            .label('space')
            .positive()
            .required('Space is required'),
        guests: yup
            .number()
            .label('guests')
            .positive()
            .required('Guest count is required'),
        beds: yup
            .number()
            .label('beds')
            .positive()
            .required('Bed count is required'),
        price: yup
            .number()
            .label('price')
            .positive()
            .required('Price is required'),
        description: yup
            .string('Enter the description')
            .required('Description is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            space: '',
            guests: '',
            beds: '',
            price: '',
            description: '',
            facilities: [],
            image: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            const formData = new FormData();
            formData.append('file',imageFile);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            const room = {
                roomName: values.name,
                type: values.type,
                space: values.space,
                guests: values.guests,
                beds: values.beds,
                price: values.price,
                description: values.description,
                facilities: values.facilities,
                image: imageFile.name,
            }

            console.log(imageFile,room);

            axios.post('http://localhost:8080/rooms', room)
                .then(response => {
                    axios.post("http://localhost:8080/files",formData,config)
                        .then(() => {
                            if (response.data.success) {
                                alert('Room Successfully Added')

                            } else {
                                alert('Failed to add room')
                            }
                        }).catch((error) => {
                        alert(error.message);
                    });

                })
        },
    });

    useEffect(() => {},[])

    return (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Rooms & Suite Management
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
                    Add a Room
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
                            labelId="type"
                            select
                            id="type"
                            name="type"
                            autoWidth
                            variant = 'outlined'
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            helperText={formik.touched.type && formik.errors.type}
                            style={{'marginTop': '10px'}}
                        >
                            <MenuItem value={'Room'}>Room</MenuItem>
                            <MenuItem value={'Suite'}>Suite</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            id="guests"
                            name="guests"
                            label="Guests"
                            type="number"
                            value={formik.values.guests}
                            onChange={formik.handleChange}
                            error={formik.touched.guests && Boolean(formik.errors.guests)}
                            helperText={formik.touched.guests && formik.errors.guests}
                        />
                        <TextField
                            fullWidth
                            id="beds"
                            name="beds"
                            label="Beds"
                            type="number"
                            value={formik.values.beds}
                            onChange={formik.handleChange}
                            error={formik.touched.beds && Boolean(formik.errors.beds)}
                            helperText={formik.touched.beds && formik.errors.beds}
                        />
                        <TextField
                            fullWidth
                            id="space"
                            name="space"
                            label="Space (m²)"
                            type="number"
                            value={formik.values.space}
                            onChange={formik.handleChange}
                            error={formik.touched.space && Boolean(formik.errors.space)}
                            helperText={formik.touched.space && formik.errors.space}
                        />
                        <TextField
                            fullWidth
                            id="price"
                            name="price"
                            label="Price per night/person"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            multiline
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <Autocomplete
                            multiple
                            id="facilities"
                            options={facilitiesSet}
                            defaultValue={[facilitiesSet[0]]}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField {...params} variant="standard" label="Facilities"  />
                            )}
                            value={formik.values.facilities}
                            onChange={(e, value) => {
                                formik.setFieldValue(
                                    "facilities",
                                    value !== null ? value : formik.initialValues.facilities
                                );
                            }}
                            error={formik.touched.facilities && Boolean(formik.errors.facilities)}
                            helperText={formik.touched.facilities && formik.errors.facilities}
                        />
                        <InputLabel id="image" style={{
                            marginTop: '10px',
                        }}>Image</InputLabel>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            value={formik.values.image}
                            onChange={(e) => {setImageFile((e.target.files[0]))}}
                            error={formik.touched.image && Boolean(formik.errors.image)}
                            helperText={formik.touched.image && formik.errors.image}
                            />
                        <SubmitButton
                                style={{
                                    float: 'right',
                                    marginTop: '10px',
                                    backgroundColor: '#5a2360',
                                    fontFamily: 'Josefin Sans'
                                }}
                                type = "submit"
                        >
                            Add Room
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </div>
    );
};
