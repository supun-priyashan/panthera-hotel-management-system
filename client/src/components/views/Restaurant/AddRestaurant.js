import React, {useEffect, useState} from 'react';
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import {Button, Input, InputLabel, TextField} from "@material-ui/core";
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

export const AddRestaurant = () => {

    const [imageFile,setImageFile] = useState([]);

    const validationSchema = yup.object({
        restaurantName: yup
            .string('Enter restaurant name')
            .required('Restaurant Name is required'),
        caption: yup
            .string('Enter restaurant caption')
            .required('Restaurant caption is required'),
        description: yup
            .string('Enter Description')
            .required('Description is required'),
    });

    const formik = useFormik({
        initialValues: {
            restaurantName: '',
            caption: '',
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
            const restaurants = {
                restaurantName: values.restaurantName,
                caption: values.caption,
                description: values.description,
                image: imageFile.name,
            }

            console.log(imageFile,restaurants);

            axios.post('http://localhost:8080/restaurants', restaurants)
                .then(response => {
                    axios.post("http://localhost:8080/files",formData,config)
                        .then(() => {
                            if (response.data.success) {
                                alert('Restaurant Successfully Added')
                            } else {
                                alert('Failed to add food')
                            }
                        }).catch((error) => {
                        alert(error.message);
                    });

                }).catch((error) => console.error(error))

        },
    });

    useEffect(() => {},[])

    return (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Restaurant Management
                <div className={'dashboard-subheader'}>
                    {/*TODO Align icon an route to go back*/}
                    <Icon style={{
                        color: '#5a2360',
                    }}>arrow_back_ios</Icon>
                    Add a Restaurant
                </div>
            </div>
            <div className={'main-container'}>
                <div className={'form-container'}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="restaurantName"
                            name="restaurantName"
                            label="Restaurant Name"
                            value={formik.values.restaurantName}
                            onChange={formik.handleChange}
                            error={formik.touched.restaurantName && Boolean(formik.errors.restaurantName)}
                            helperText={formik.touched.restaurantName && formik.errors.restaurantName}
                        />
                        <br/><br/>
                        <TextField
                            fullWidth
                            id="caption"
                            name="caption"
                            label="Caption"
                            value={formik.values.caption}
                            onChange={formik.handleChange}
                            error={formik.touched.caption && Boolean(formik.errors.caption)}
                            helperText={formik.touched.caption && formik.errors.caption}
                        />
                        <br/><br/>
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <br/><br/>
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
                            Add Restaurant
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRestaurant;
