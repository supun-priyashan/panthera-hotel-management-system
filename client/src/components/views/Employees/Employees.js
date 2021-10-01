import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import {Button, Icon, Link, Paper} from "@material-ui/core";
import axios from "axios";

export const Employees = () => {

    const history = useHistory();

    const [employees,setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/employees').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.employees);
                setEmployees(response.data.employees.map((item) => ({
                    id:item._id,
                    employeeName: item.employeeName,
                    type: item.type,
                    gender: item.gender,
                    dateOfBirth: item.dateOfBirth,
                    permanentAddress: item.permanentAddress,
                    nationalID: item.nationalID,
                    phoneNumber: item.phoneNumber,
                    email: item.email,

                })));
                setTimeout(console.log(employees),3000)
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])

    const deleteEmployee = async (props) => {

        console.log(props.data.id);

        const id = props.data.id;

        await axios.delete('http://localhost:8080/employees/' + id).
        then((response) => {
            if(response.data.success){
                alert("Employee Successfully deleted.");

                axios.get('http://localhost:8080/employees').
                then((response) => {
                    if(response.data.success) {
                        console.log(response.data.employees);
                        setEmployees(response.data.employees.map((item) => ({
                            id:item._id,
                            employeeName: item.employeeName,
                            type: item.type,
                            gender: item.gender,
                            dateOfBirth: item.dateOfBirth,
                            permanentAddress: item.permanentAddress,
                            nationalID: item.nationalID,
                            phoneNumber: item.phoneNumber,
                            email: item.email,

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
                Add Employees
            </div>
            <div className={'main-container-tables'}>
                <div className={'table-container'}>
                    <MaterialTable
                        title="Add employees"
                        columns={[
                            { title: 'id', field: 'id', hidden: true },
                            { title: 'Name', field: 'employeeName' },
                            { title: 'Type', field: 'type' },
                            { title: 'Gender', field: 'gender' },
                            { title: 'DateOfBirth', field: 'dateOfBirth' },
                            { title: 'PermanentAddress', field: 'permanentAddress' },
                            { title: 'NationalID', field: 'nationalID' },
                            { title: 'PhoneNumber', field: 'phoneNumber' },
                            { title: 'Email', field: 'email' },

                        ]}
                        data={
                            employees
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
                                tooltip: "Add new employee",
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
                                    if (props.action.icon === 'edit') {
                                        return (
                                            <button
                                                class="MuiButtonBase-root
                                                MuiIconButton-root MuiIconButton-colorInherit"
                                                tabindex="0"
                                                type="button"
                                                title="Edit User"
                                                onClick={(event, rowData) => {
                                                    history.push({
                                                        pathname: '/employees/edit-employee/' + props.data.id,
                                                        state: props.data
                                                    });
                                                    console.log(props.data);
                                                }
                                                }
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
                                    if (props.action.icon === 'delete') {
                                        return (

                                            <button
                                                class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
                                                tabindex="0"
                                                type="button"
                                                title="Delete User"
                                                onClick={(event, rowData) => deleteEmployee(props)
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
                                    if (props.action.icon === 'add_box') {
                                        return (
                                            <Button
                                                onClick={(event) => history.push('/employees/add-employee/')}
                                                variant="contained"
                                                startIcon={<Icon>add</Icon>}
                                                /*component={Link}
                                                to='/employees/add-employee/'*/
                                                style={{
                                                    textTransform: 'none',
                                                    borderRadius: 35,
                                                    backgroundColor: '#5a2360',
                                                    fontFamily: 'Roboto',
                                                    color: 'white',                         
                                                          }}
                                                size="medium"
                                            >
                                                Add an Employee
                                            </Button>
                                        )
                                    }


                                }
                        }
                        }

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



