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


export const EditMenu = (props) => {

    const [isLoading,setIsLoading] = useState(true);
    const [foodName,setFoodName] = useState('');
    const [price,setPrice] = useState('');
    const [restaurantType,setRestaurantType] = useState('');
    const [description,setDescription] = useState('');
    const [image,setImage] = useState('');
    /*const [noOfBeds, setBeds] = useState('');
    const [noOfGuests, setGuests] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');*/
    const [id, setId] = useState('');

    const history = useHistory();

    const data = history.location.state;

    useEffect(async () => {
        await axios.get('http://localhost:8080/foods/'+props.match.params.id).
        then((response) => {
            if(response.data.success) {

                console.log(response.data.food);
                const data = response.data.food;

                setFoodName(data.foodName);
                setPrice(data.price);
                setRestaurantType(data.restaurantType);
                setDescription(data.description);
                setImage(data.image);
                /*setBeds(data.noOfBeds);
                setGuests(data.noOfGuests);
                setArrivalDate(data.arrivalDate);
                setDepartureDate(data.departureDate);*/
                setId(data._id);

                setIsLoading(false);

            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])

    const validationSchema = yup.object({
        foodName: yup
            .string('Enter food name')
            .required('Food Name is required'),
        price: yup
            .string('Enter food price')
            .required('Food price is required'),
        restaurantType: yup
            .string('Enter Restaurant')
            .required('Restaurant is required'),
        description: yup
            .string('Enter Description')
            .required('Description is required'),
    });

    const formik = useFormik({
        initialValues: {
            _id: id,
            foodName: foodName,
            price: price,
            restaurantType: restaurantType,
            description:description,
            imageFile:image,
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

            const food = {
                _id: id,
                foodName: values.foodName,
                price: values.price,
                restaurantType: values.restaurantType,
                description: values.description,
                image: image,
            }

            axios.put('http://localhost:8080/foods', food)
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

    return isLoading ?(
            <div>
                <div className={'content'}>
                    <div className={'dashboard-header'}>
                        Food Management
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
                            Edit Food Details
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
                Food Management
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
                    Edit Food Details
                </div>
            </div>
            <div className={'main-container'}>
                <div className={'form-container'}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="foodName"
                            name="foodName"
                            label="Food Name"
                            value={formik.values.foodName}
                            onChange={formik.handleChange}
                            error={formik.touched.foodName && Boolean(formik.errors.foodName)}
                            helperText={formik.touched.foodName && formik.errors.foodName}
                        />
                        <br/><br/>
                        <TextField
                            fullWidth
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <br/><br/>
                        <br/>
                        <InputLabel id="type">Restaurant Type</InputLabel>
                        <TextField
                            labelId="restaurantType"
                            select
                            id="restaurantType"
                            name="restaurantType"
                            autoWidth
                            variant = 'outlined'
                            value={formik.values.restaurantType}
                            onChange={formik.handleChange}
                            error={formik.touched.restaurantType && Boolean(formik.errors.restaurantType)}
                            helperText={formik.touched.restaurantType && formik.errors.restaurantType}
                            style={{'marginTop': '10px', width : '150px'}}
                        >
                            <MenuItem value={'Echo'}>Echo</MenuItem>
                            <MenuItem value={'Tea Lounge'}>Tea Lounge</MenuItem>
                            <MenuItem value={'Tao'}>Tao</MenuItem>
                            <MenuItem value={'Aswedduma'}>Aswedduma</MenuItem>
                        </TextField>
                        <br/><br/>
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
                        <br/><br/><br/>
                        <InputLabel id="image" style={{
                            marginTop: '10px',
                        }}>Image</InputLabel>
                        <br/>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            value={formik.values.image}
                            onChange={(e) => {setImage((e.target.files[0]))}}
                            error={formik.touched.image && Boolean(formik.errors.image)}
                            helperText={formik.touched.image && formik.errors.image}
                        />
                        <br/><br/><br/>
                        <SubmitButton
                            style={{
                                float: 'right',
                                marginTop: '10px',
                                backgroundColor: '#5a2360',
                                fontFamily: 'Josefin Sans'
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
