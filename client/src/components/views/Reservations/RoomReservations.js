import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table'
import {Button,  Icon, Paper} from "@material-ui/core";
import axios from "axios";
import {useHistory} from "react-router-dom";

export const RoomReservation = () => {

    const history = useHistory();

    const [roomReservations,setRoomReservations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/roomReservations').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.roomReservations);
                setRoomReservations(response.data.roomReservations.map((item) => ({
                    id: item._id,
                    customerName: item.customerName,
                    email: item.email,
                    contactNumber: item.contactNumber,
                    roomName: item.roomName,
                    noOfBeds: item.noOfBeds,
                    noOfGuests: item.noOfGuests,
                    arrivalDate: item.arrivalDate,
                    departureDate: item.departureDate,
                })));
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])

    const deleteRoomReservation = async (props) => {

        console.log(props.data.id);

        const id = props.data.id;

        await axios.delete('http://localhost:8080/roomReservations/' + id).
        then((response) => {
            if(response.data.success){
                alert("Successfully deleted.");

                axios.get('http://localhost:8080/roomReservations').
                then((response) => {
                    if(response.data.success) {
                        console.log(response.data.roomReservations);
                        setRoomReservations(response.data.roomReservations.map((item) => ({
                            id: item._id,
                            customerName: item.customerName,
                            email: item.email,
                            contactNumber: item.contactNumber,
                            roomName: item.roomName,
                            noOfBeds: item.noOfBeds,
                            noOfGuests: item.noOfGuests,
                            arrivalDate: item.arrivalDate,
                            departureDate: item.departureDate,
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
                Rooms & Suite Reservation Management
            </div>
            <div className={'main-container'}>
                <div className={'table-container'}>
                    <MaterialTable
                        title="Room and Suite Reservation"
                        columns={[
                            { title: 'id', field: 'id', hidden: true },
                            { title: 'Customer Name', field: 'customerName' },
                            { title: 'Email', field: 'email' },
                            { title: 'Contact Number', field: 'contactNumber' },
                            { title: 'Room Name', field: 'roomName' },
                            { title: 'Beds', field: 'noOfBeds', type: 'numeric' },
                            { title: 'Guests', field: 'noOfGuests', type: 'numeric' },
                            { title: 'Arrival Date', field: 'arrivalDate', type: 'datetime'},
                            { title: 'Departure Date', field: 'departureDate', type: 'datetime'},

                        ]}
                        data={
                            roomReservations
                        }
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Room Reservations',
                                onClick: (event, rowData) => alert("You saved " + rowData.name)
                            },

                            {
                                icon: 'delete',
                                tooltip: 'Delete Room Reservations',

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
                                                title="Edit Room Reservation"
                                                onClick={(event, rowData) => {
                                                    history.push({
                                                        pathname:'/roomReservations/edit-roomReservations/' + props.data.id,
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
                                                title="Delete Room Reservation"
                                                onClick={(event, rowData) =>
                                                    deleteRoomReservation(props)
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

