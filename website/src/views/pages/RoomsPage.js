import React, {Fragment, useEffect, useState} from "react";

// reactstrap components
import {
    Button,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import RoomsHeader from "../../components/Headers/RoomsHeader";
import axios from "axios";
import {Link} from "@mui/material";
import {useHistory} from "react-router";

function RoomsPage() {

    const [rooms,setRooms] = useState([]);
    const history = useHistory();

    useEffect(() => {
        document.body.classList.add("landing-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("landing-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }, []);

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
                //setRooms(response.data.rooms);
                setTimeout(() => console.log(rooms.length),5000)
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])

    return (
        <>
            <IndexNavbar />
            <div className="wrapper">
                <RoomsHeader />
                <div className="section section-about-us">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="60">
                                <h2 className="title">Rooms</h2>
                                <div className={'container'}>
                                    {rooms.length > 0 && rooms.map((item,index)=>{
                                        return(
                                            <Fragment key={index}>
                                                    <div className="card"
                                                         style={{
                                                        width: "20rem",
                                                        margin: "25px 25px 25px 25px",
                                                        }}
                                                         onClick={() => history.push({
                                                        pathname: '/reservations/room',
                                                        state: {
                                                            roomId:item.id
                                                        }
                                                    })}>
                                                        <img className="card-img-top" src={'http://localhost:8080/uploads/'+item.image}  alt="Room image"/>
                                                        <div className="card-body">
                                                            <p className="card-text">{item.roomName}</p>
                                                        </div>
                                                    </div>

                                            </Fragment>
                                        )
                                    })}
                                    {/*<div className="card" style={{width: "20rem"}}>
                                        <img className="card-img-top" src={'http://localhost:8080/uploads/'+rooms[0].image}  alt="Room image"/>
                                        <div className="card-body">
                                            <p className="card-text">{rooms[0].roomName}</p>
                                        </div>
                                    </div>*/}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <TransparentFooter/>
            </div>
        </>
    );
}

export default RoomsPage;
