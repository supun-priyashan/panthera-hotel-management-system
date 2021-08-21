import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table'
import {Button,  Icon, Paper} from "@material-ui/core";
import axios from "axios";

export const HallReservation = () => {

    const [hallReservations,setHallReservations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/hallReservations').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.hallReservations);
                setHallReservations(response.data.hallReservations.map((item) => ({
                    id: item._id,
                    customerName: item.customerName,
                    email: item.email,
                    contactNumber: item.contactNumber,
                    hallName: item.hallName,
                    hallType: item.hallType,
                    eventType: item.eventType,
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

    return (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Reception Hall Management
            </div>
            <div className={'main-container'}>
                <div className={'table-container'}>
                    <MaterialTable
                        title="Hall Reservations"
                        columns={[
                            { title: 'id', field: 'id', hidden: true },
                            { title: 'Customer Name', field: 'customerName' },
                            { title: 'Email', field: 'email' },
                            { title: 'Contact Number', field: 'contactNumber' },
                            { title: 'Hall Name', field: 'hallName' },
                            { title: 'Hall Type', field: 'hallType' },
                            { title: 'Event Type', field: 'eventType'},
                            { title: 'Guests', field: 'noOfGuests', type: 'numeric' },
                            { title: 'Arrival Date', field: 'arrivalDate', type: 'datetime'},
                            { title: 'Departure Date', field: 'departureDate', type: 'datetime'},
                        ]}
                        data={
                            hallReservations
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
                                                onClick={(event, rowData) => alert("You edited " + props.data.name)}
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
                                                onClick={(event, rowData) => alert("You deleted " + props.data.name)}
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

