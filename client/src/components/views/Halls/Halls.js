import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import MaterialTable from "material-table";
import {Button, Icon, Paper} from "@material-ui/core";
import {JumpCircleLoading} from "react-loadingg";

export const Halls = () => {

    const history = useHistory();

    const [halls,setHalls] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/halls').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.halls);
                setHalls(response.data.halls.map((item) => ({
                    id: item._id,
                    hallName: item.hallName,
                    type: item.type,
                    height: item.height,
                    guests: item.guests,
                    space: item.space,
                    facilities: item.facilities.join(),
                    image: item.image,
                    events: item.events.join(),
                    price: item.price,
                    description: item.description,
                })));
                setIsLoading(false);
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])

    const deleteHall = async (props) => {

        console.log(props.data.id);

        const id = props.data.id;

        await axios.delete('http://localhost:8080/halls/' + id).
        then((response) => {
            if(response.data.success){
                alert("Successfully deleted.");

                axios.get('http://localhost:8080/halls').
                then((response) => {
                    if(response.data.success) {
                        console.log(response.data.halls);
                        setHalls(response.data.halls.map((item) => ({
                            id: item._id,
                            hallName: item.hallName,
                            type: item.type,
                            height: item.height,
                            guests: item.guests,
                            space: item.space,
                            facilities: item.facilities.join(),
                            image: item.image,
                            events: item.events.join(),
                            price: item.price,
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

    return isLoading ? (
            <div className={'content'}>
                <div className={'dashboard-header'}>
                    Reception Hall Management
                </div>
                <div className={'main-container-tables'}>
                    <div className={'table-container'}>
                        Fetching data...
                        <JumpCircleLoading
                            color ="#5a2360"
                            speed = {0.5}
                            size = "large"

                        />
                    </div>
                </div>
            </div>
        )
        : (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Reception Hall Management
            </div>
            <div className={'main-container-tables'}>
                <div className={'table-container'}>
                    <MaterialTable
                        title="Reception Halls"
                        columns={[
                            { title: 'id', field: 'id', hidden: true },
                            { title: 'Name', field: 'hallName' },
                            { title: 'Type', field: 'type' },
                            { title: 'Guests', field: 'guests', type: 'numeric' },
                            { title: 'Height', field: 'height', type: 'numeric' },
                            { title: 'Space(m²)', field: 'space', type: 'numeric' },
                            { title: 'Facilities', field: 'facilities' },
                            { title: 'Events', field: 'events'},
                            { title: 'Image', field: 'image', type: 'numeric', hidden:true },
                            { title: 'Price', field: 'price', type: 'numeric' },
                            { title: 'Description', field: 'description', hidden:true },
                        ]}
                        data={
                            halls
                        }
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit hall data',
                                onClick: (event, rowData) => alert("You saved " + rowData.name)
                            },

                            {
                                icon: 'delete',
                                tooltip: 'Delete hall',

                            },
                            {
                                icon: "add_box",
                                tooltip: "Add new hall",
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
                                                title="Edit Hall"
                                                onClick={(event, rowData) => {
                                                    history.push({
                                                        pathname:'/halls/edit-hall/' + props.data.id,
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
                                                title="Delete Hall"
                                                onClick={(event, rowData) => deleteHall(props)}
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
                                                onClick={(event) => history.push('/halls/add-hall/')}
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
                                                Add a hall
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
