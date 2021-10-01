import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table'
import {Button, Icon, Link, Paper} from "@material-ui/core";
import axios from "axios";

export const Restaurants = () => {

    const history = useHistory();

    const [restaurants,setRestaurants] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/restaurants').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.restaurants);
                setRestaurants(response.data.restaurants.map((item) => ({
                    id: item._id,
                    restaurantName: item.restaurantName,
                    caption: item.caption,
                    // image: item.image,
                    // imageCount: item.images.length,
                    description: item.description,
                })));
                setTimeout(console.log(restaurants),3000)
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])

    const deleteRestaurant = async (props) => {

        console.log(props.data.id);

        const id = props.data.id;

        await axios.delete('http://localhost:8080/restaurants/' + id).
        then((response) => {
            if(response.data.success){
                alert("Successfully deleted.");

                axios.get('http://localhost:8080/restaurants').
                then((response) => {
                    if(response.data.success) {
                        console.log(response.data.restaurants);
                        setRestaurants(response.data.restaurants.map((item) => ({
                            id: item._id,
                            restaurantName: item.restaurantName,
                            caption: item.caption,
                            // image: item.image,
                            // imageCount: item.images.length,
                            description: item.description,
                        })));
                    } else{
                        alert('An error occurred while retrieving data');
                        console.log(response.data.error);
                    }
                })

            }else {
                alert('An error happened');
                console.log(response.data.error);
            }
        }).catch((error) => {
            console.log(error);
        })


    }

    return (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Restaurant Management
            </div>
            <div className={'main-container'}>
                <div className={'table-container'}>
                    <MaterialTable
                        title="Adding Restaurant Details"
                        columns={[
                            { title: 'id', field: 'id', hidden: true },
                            { title: 'Name', field: 'restaurantName' },
                            { title: 'Caption', field: 'caption' },
                            { title: 'Description', field: 'description'},
                            //{ title: 'Images', field: 'imageCount', type: 'numeric' },
                        ]}
                        data={
                            restaurants
                        }
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit User',
                                onClick: (event, rowData) => alert("You saved " + rowData.name)
                            },

                            {
                                icon: 'delete',
                                tooltip: 'Delete User',

                            },
                            {
                                icon: "add_box",
                                tooltip: "Add new room",
                                //position: "center",
                                isFreeAction:true,
                                onClick: () => {
                                    console.log("clicked");
                                }
                            }
                        ]}
                        components={{
                            Container: props => <Paper {...props} elevation={0}/>,
                            Action:
                                props => {
                                    if(props.action.icon === 'edit'){
                                        return(
                                            <button
                                                class="MuiButtonBase-root
                                                MuiIconButton-root MuiIconButton-colorInherit"
                                                tabindex="0"
                                                type="button"
                                                title="Edit User"
                                                onClick={(event, rowData) => {
                                                    history.push({
                                                        pathname:'/restaurants/edit-restaurant/' + props.data.id,
                                                        state: props.data
                                                    });
                                                    console.log(props.data);
                                                }}
                                            >
                                                <span class="MuiIconButton-label">
                                                    <span class="material-icons MuiIcon-root"
                                                          aria-hidden="true">
                                                        edit
                                                    </span>
                                            </span>
                                                <span class="MuiTouchRipple-root"></span>
                                            </button>
                                        )
                                    }
                                    if(props.action.icon === 'delete'){
                                        return(
                                            <button
                                                class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
                                                tabindex="0"
                                                type="button"
                                                title="Delete User"
                                                onClick={(event, rowData) =>
                                                    deleteRestaurant(props)
                                                }
                                            >
                                                <span
                                                    class="MuiIconButton-label">
                                                    <span class="material-icons MuiIcon-root"
                                                          aria-hidden="true">
                                                        delete
                                                    </span>
                                                </span>
                                                <span class="MuiTouchRipple-root"></span>
                                            </button>
                                        )
                                    }
                                    if(props.action.icon === 'add_box'){
                                        return(
                                            <Button
                                                onClick={(event) => history.push('/restaurants/add-restaurant/')}
                                                variant="contained"
                                                startIcon={<Icon>add</Icon>}
                                                /*component={Link}
                                                to='/rooms/add-room/'*/
                                                style={{
                                                    textTransform: 'none',
                                                    borderRadius: 35,
                                                    backgroundColor: '#5a2360',
                                                    fontFamily: 'Roboto',
                                                    color:'white',
                                                }}
                                                size="medium"
                                            >
                                                Add a restaurant
                                            </Button>
                                        )
                                    }
                                }

                        }}

                        options={{
                            actionsColumnIndex: -1,
                            tableLayout: 'auto',
                            exportButton: true,
                            sorting: true,
                            pageSize: 6,
                            pageSizeOptions: [6],
                            showTitle: false,
                            toolbarButtonAlignment: 'left',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
