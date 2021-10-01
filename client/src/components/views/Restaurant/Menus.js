import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table'
import {Button, Icon, Link, Paper} from "@material-ui/core";
import axios from "axios";
//test comments
export const Menus = () => {

    const history = useHistory();

    const [menus,setMenus] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/foods').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.foods);
                setMenus(response.data.foods.map((item) => ({
                    id: item._id,
                    foodName: item.foodName,
                    price: item.price,
                    restaurantType: item.restaurantType,
                    description:item.description,
                })));
                setTimeout(console.log(menus),3000)
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])

    const deleteMenu = async (props) => {

        console.log(props.data.id);

        const id = props.data.id;

        await axios.delete('http://localhost:8080/foods/' + id).
        then((response) => {
            if(response.data.success){
                alert("Successfully deleted.");

                axios.get('http://localhost:8080/foods').
                then((response) => {
                    if(response.data.success) {
                        console.log(response.data.foods);
                        setMenus(response.data.foods.map((item) => ({
                            id: item._id,
                            foodName: item.foodName,
                            price: item.price,
                            restaurantType: item.restaurantType,
                            description:item.description,
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
                Food Management
            </div>
            <div className={'main-container'}>
                <div className={'table-container'}>
                    <MaterialTable
                        title="Adding Food Details"
                        columns={[
                            { title: 'id', field: 'id', hidden: true },
                            { title: 'Food', field: 'foodName' },
                            { title: 'Price', field: 'price' },
                            { title: 'Restaurant Type', field: 'restaurantType' },
                            { title: 'Description', field: 'description'},
                            //{ title: 'Images', field: 'image', type: 'numeric' },
                        ]}
                        data={
                            menus
                        }
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Food Data',
                                onClick: (event, rowData) => alert("You saved " + rowData.name)
                            },

                            {
                                icon: 'delete',
                                tooltip: 'Delete Food',

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
                                                        pathname:'/restaurants/edit-menu/' + props.data.id,
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
                                                    deleteMenu(props)
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
                                                onClick={(event) => history.push('menus/add-menus/')}
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
                                                Add a food
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
