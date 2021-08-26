import React, {Fragment, useEffect, useState} from "react";
import Datetime from "react-datetime";
// reactstrap components
import {
    Button,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col, FormGroup, Form, Card, CardHeader, CardTitle, CardBody, CardFooter,
} from "reactstrap";

// core components
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import IndexHeader from "../../components/Headers/IndexHeader";
import axios from "axios";
import ConfirmRoomReservationHeader from "../../components/Headers/ConfirmRoomReservationHeader";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";


function ConfirmRoomReservationPage(props) {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const dates = history.location.state;

    const [roomReservations,setRoomReservations] = useState([]);

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
        axios.get('http://localhost:8080/roomReservations').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.roomReservations);
                /*setRooms(response.data.rooms.map((item) => ({
                    id: item._id,
                    roomName: item.roomName,
                    type: item.type,
                    beds: item.beds,
                    guests: item.guests,
                    space: item.space,
                    facilities: item.facilities,
                    image: item.image,
                    price: item.price,
                    description: item.description,
                })));*/
                setRoomReservations(response.data.roomReservations);
                setTimeout(() => console.log(roomReservations.length),5000)
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])

    const onSubmit = (e) => {
        e.preventDefault();
        if(!firstName ){
            alert("Firstname is required");
        }else if(!lastName){
            alert("LastName is required");
        }else if(!email){
            alert("Email is required");
        }else if(!mobile){
            alert("Mobile is required");
        } else{
            alert("Reservation success");
        }
    }

    return (
        <>
            <IndexNavbar />
            <div className="wrapper">
                <div className="section section-team">
                    <Container>
                        <div className="team">
                            <div className={'container'}>
                                <Fragment>
                                    <div className="card" style={{
                                        width: "72rem",
                                        height: "18.5rem",
                                        margin: "10px",
                                        backgroundColor: "#F0F1F0",
                                    }} >

                                        <div className="card-body">
                                            <h6 className="category" style={{
                                                color: "black",
                                                fontWeight: 'bold',
                                                fontSize: 15,
                                            }} >Stay Summary:</h6>
                                            <Row>
                                                <Col className="ml-auto mr-auto text-left" md="4">
                                                    <img
                                                        alt="..."
                                                        className="img-raised"
                                                        src={require("assets/img/roomReserve.jpg").default}
                                                    ></img>
                                                </Col>
                                                <Col className="ml-auto mr-auto text-left" md="8">
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <div className="team-player">
                                                        <p className="category" style={{
                                                            color: "#404A45",
                                                        }}>16-08-2021 / 18-08-2021</p>
                                                    </div>
                                                    <div className="team-player">
                                                        <p className="category" style={{
                                                            color: "#404A45",
                                                        }}>Rooms & Guests: 1 Room, 2 Adults, 0 Children</p>
                                                    </div>
                                                    <div className="team-player">
                                                        <p className="category" style={{
                                                            color: "#404A45",
                                                        }}>Room Type: DELUXE DOUBLE ROOM</p>
                                                    </div>
                                                </Col>
                                            </Row>


                                        </div>

                                    </div>
                                </Fragment>
                            </div>

                            <Row>
                                <Col className="ml-auto mr-auto text-left" md="5">
                                    <div className="team-player">


                                        <h3 className="title">Guest Information</h3>

                                        <Container>

                                            <br></br>
                                            <Row>
                                                <Col lg="6" sm="6">
                                                    <p className="category">First Name</p>
                                                    <FormGroup>
                                                        <Input
                                                            id="firstName"
                                                            name="firstName"
                                                            label="First Name"
                                                            defaultValue=""
                                                            type="text"
                                                            value={firstName}
                                                            onChange={(e) => {setFirstName(e.target.value)}}
                                                            inputProps={{ placeholder: "First Name" }}
                                                        ></Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6" sm="6">
                                                    <p className="category">Last Name</p>
                                                    <FormGroup>
                                                        <Input
                                                            id="lastName"
                                                            name="lastName"
                                                            label="Last Name"
                                                            defaultValue=""
                                                            type="text"
                                                            value={lastName}
                                                            onChange={(e) => {setLastName(e.target.value)}}
                                                            inputProps={{ placeholder: "Last Name" }}
                                                        ></Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <br></br>
                                            <Row>
                                                <Col lg="12" sm="6">
                                                    <p className="category">Email</p>
                                                    <FormGroup>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            label="e-mail"
                                                            defaultValue=""
                                                            type="text"
                                                            value={email}
                                                            onChange={(e) => {setEmail(e.target.value)}}
                                                            inputProps={{ placeholder: "E-mail" }}
                                                        ></Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <br></br>
                                            <Row>
                                                <Col lg="12" sm="6">
                                                    <p className="category">Mobile</p>
                                                    <FormGroup>
                                                        <Input
                                                            id="mobile"
                                                            name="mobile"
                                                            label="Mobile"
                                                            defaultValue=""
                                                            type="number"
                                                            value={mobile}
                                                            onChange={(e) => {setMobile(e.target.value)}}
                                                            inputProps={{ placeholder: "Mobile" }}
                                                        ></Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                        </Container>

                                    </div>
                                </Col>

                                <Col className="ml-auto mr-auto text_left" md="6">

                                    <div className={'container'}>
                                        <Fragment>
                                            <div className="card" style={{
                                                width: "38rem",
                                                height: "27rem",
                                                margin: "10px",

                                            }} >

                                                <div className="card-body">
                                                    <h5 className="title text-center" >Charges</h5>

                                                    <br></br>
                                                    <Row>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p className="category" style={{
                                                                    color: "black",
                                                                }}>Room Charges</p>
                                                            </div>
                                                        </Col>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p className="category" style={{
                                                                    color: "#404A45",
                                                                }}>LKR 61,923.20</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <br></br>
                                                    <Row>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p className="category" style={{
                                                                    color: "black",
                                                                }}>Service Charge and Tax</p>
                                                            </div>
                                                        </Col>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p className="category" style={{
                                                                    color: "#404A45",
                                                                }}>LKR 6350.75</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <hr></hr>
                                                    <br></br>
                                                    <Row>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p className="category" style={{
                                                                    color: "black",
                                                                }}>Total Charge</p>
                                                            </div>
                                                        </Col>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p className="category" style={{
                                                                    color: "#404A45",
                                                                }}>LKR 68,273.95</p>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <br></br>

                                                    <Button
                                                        block
                                                        className="btn-round"
                                                        color="info"
                                                        href="#pablo"
                                                        onClick={(e) => onSubmit(e)}
                                                        size="lg"
                                                    >
                                                        BOOK NOW
                                                    </Button>


                                                </div>

                                            </div>
                                        </Fragment>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                    </Container>
                </div>

                <TransparentFooter/>
            </div>
        </>
    );
}

export default ConfirmRoomReservationPage;
