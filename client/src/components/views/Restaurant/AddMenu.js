import React, {useEffect, useState} from 'react';
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import {Button, IconButton, Input, InputLabel, MenuItem, TextField} from "@material-ui/core";
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import * as yup from "yup";
import {useFormik} from "formik";
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

export const AddMenu = () => {

    const [imageFile,setImageFile] = useState([]);

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
            foodName: '',
            price: '',
            restaurantType: '',
            description:'',
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
            const food = {
                foodName: values.foodName,
                price: values.price,
                restaurantType: values.restaurantType,
                description: values.description,
                image: imageFile.name,
            }

            console.log(imageFile,food);

            axios.post('http://localhost:8080/foods', food)
                .then(response => {
                    axios.post("http://localhost:8080/files",formData,config)
                        .then(() => {
                            if (response.data.success) {
                                alert('Food Successfully Added')
                            } else {
                                alert('Failed to add food')
                            }
                        }).catch((error) => {
                        alert(error.message);
                    });

                }).catch((error) => console.error(error))

        },
    });

    return (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Food Management
                <div className={'dashboard-subheader'}>
                    {/*TODO Align icon an route to go back*/}
                    <IconButton aria-label="delete">
                        <Icon style={{
                            color: '#5a2360',
                        }}>arrow_back_ios</Icon>
                    </IconButton>
                    Add a Food
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
                            /*style={}*/
                            value={formik.values.image}
                            onChange={(e) => {setImageFile((e.target.files[0]))}}
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
                            Add Food
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

