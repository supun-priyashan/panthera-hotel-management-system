import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table'
import {Button, Icon, Link, Paper} from "@material-ui/core";
import axios from "axios";

export const Rooms = () => {

    const history = useHistory();

    const [rooms,setRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/rooms').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.rooms);
                setRooms(response.data.rooms.map((item) => ({
                    id: item._id,
                    roomName: item.roomName,
                    type: item.type,
                    beds: item.beds,
                    guests: item.guests,
                    space: item.space,
                    facilities: item.facilities.join(),
                    image: item.image,
                    price: item.price,
                    description: item.description,
                })));
                setTimeout(console.log(rooms),3000)
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])

    return (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Rooms & Suite Management
            </div>
            <div className={'main-container-tables'}>
                <div className={'table-container'}>
                    <MaterialTable
                        title="Rooms and Suites"
                        columns={[
                            { title: 'id', field: 'id', hidden: true },
                            { title: 'Name', field: 'roomName' },
                            { title: 'Type', field: 'type' },
                            { title: 'Guests', field: 'guests', type: 'numeric' },
                            { title: 'Beds', field: 'beds', type: 'numeric' },
                            { title: 'Space(m²)', field: 'space', type: 'numeric' },
                            { title: 'Facilities', field: 'facilities' },
                            { title: 'Image', field: 'image', type: 'numeric', hidden:true },
                            { title: 'Price', field: 'price', type: 'numeric' },
                            { title: 'Description', field: 'description', hidden:true },
                        ]}
                        data={
                            rooms
                        }
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Room',
                                onClick: (event, rowData) => alert("You saved " + rowData.name)
                            },

                            {
                                icon: 'delete',
                                tooltip: 'Delete Room',

                            },
                            {
                                icon: "add_box",
                                tooltip: "Add new room",
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
                                                title="Edit Room"
                                                onClick={(event, rowData) => alert("You edited " + props.data.id)}
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
                                                title="Delete Room"
                                                onClick={(event, rowData) => alert("You deleted " + props.data.id)}
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
                                                onClick={(event) => history.push('/rooms/add-room/')}
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
                                                Add a room
                                            </Button>
                                        )
                                    }
                                }

                        }}

                        options={{
                            actionsColumnIndex: -1,
                            tableLayout: 'auto',
                            //exportButton: true,
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
