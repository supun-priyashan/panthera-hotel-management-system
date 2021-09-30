import React, {Fragment, useEffect, useState} from "react";
import Datetime from "react-datetime";
// reactstrap components
import {
    Button,
    Input,
    Form,
    Label,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    FormGroup,
} from "reactstrap";

// core components
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import IndexHeader from "../../components/Headers/IndexHeader";
import axios from "axios";
import RoomReservationsHeader from "../../components/Headers/RoomReservationsHeader";
import {useHistory} from "react-router";


function RoomReservationPage(props) {
    const [arrival, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [beds, setBeds] = useState('');
    const [guests, setGuests] = useState('');


    const [roomReservations,setRoomReservations] = useState([]);
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
                    name: item.name,
                    facilities: item.facilities.join(),
                    image: item.image,
                    price: item.price,
                    description: item.description,
                })));
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])

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

    const onSubmit = () => {
        console.log(arrival,"-",departureDate,"-",beds,"-",guests);
        history.push({
            pathname: '/confirm/rooms',
            state: {
                arrival:arrival,
                departure:departureDate,
                beds:beds,
                guests:guests,

            } // your data array of objects
        })
    }

    return (
        <>
            <IndexNavbar />
            <div className="wrapper">
                <RoomReservationsHeader />

                <div className="section section-team text-center">
                    <Container>
                        <div className="team">
                            <Row>
                                <Col className="ml-auto mr-auto text-left" md="5">
                                    <div className="team-player">

                                        <h2 className="title">ABOUT THIS ROOM</h2>

                                        <p className="description">
                                            You can write here details about one of your team members.
                                            You can give more details about what they do. Feel free to
                                            add some links for people to be able to follow them outside the site.
                                            Feel free to add some links for people to be able to follow them outside the site.
                                        </p>


                                        <Form>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <label htmlFor="inputEmail4">Arrival Date</label>
                                                    <Input
                                                        id="arrivalDate"
                                                        name="arrivalDate"
                                                        label="Arrival Date"
                                                        type="date"
                                                        value={arrival}
                                                        onChange={(e)=>setArrivalDate(e.target.value)}
                                                        inputProps={{ placeholder: "ArrivalDate Picker" }}
                                                    />
                                                    {/*<Input id="inputEmail4" placeholder="Email" type="email"></Input>*/}
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputPassword4">Depature Date</label>
                                                    <Input
                                                        id="departureDate"
                                                        name="departureDate"
                                                        label="Departure Date"
                                                        type="date"
                                                        value={departureDate}
                                                        onChange={(e)=>setDepartureDate(e.target.value)}
                                                        inputProps={{ placeholder: "DepatureDate Picker" }}
                                                    />
                                                    {/*<Input*/}
                                                    {/*    id="inputPassword4"*/}
                                                    {/*    placeholder="Password"*/}
                                                    {/*    type="password"*/}
                                                    {/*></Input>*/}
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputPassword4">Beds</label>
                                                    <Input
                                                        id="beds"
                                                        name="beds"
                                                        label="Beds"
                                                        placeholder="Beds"
                                                        type="number"
                                                        onChange={(e) => {setBeds(e.target.value)}}
                                                    />

                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputPassword4">Guests</label>
                                                    <Input
                                                        id="guests"
                                                        name="guests"
                                                        label="Guests"
                                                        placeholder="Guests"
                                                        type="number"
                                                        onChange={(e)=>{setGuests(e.target.value)}}
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                type="submit"
                                                block
                                                className="btn-round"
                                                color="info"
                                                href="#pablo"
                                                onClick={onSubmit}
                                                size="lg">
                                                BOOK NOW
                                            </Button>
                                        </Form>


                                    </div>
                                </Col>
                                <Col className="ml-auto mr-auto text-left" md="6">
                                    <div className={'container'}>
                                        <Fragment>
                                            <div className="card" style={{
                                                width: "38rem",
                                                height: "30rem",
                                                margin: "10px",
                                                backgroundColor: "#F8FCFA",
                                            }} >
                                                <div className="card-body">
                                                    <h5 className="title">ROOM FACILITIES</h5>
                                                    <Row>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p>Kettle,tea & coffee</p>
                                                            </div>
                                                        </Col>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p>Flat screen TV</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p>Breakfast included</p>
                                                            </div>
                                                        </Col>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p>Hairdryer</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p>Soundproofing</p>
                                                            </div>
                                                        </Col>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p>Air conditioning</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p>Balcony</p>
                                                            </div>
                                                        </Col>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p>Bathroom & slippers</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p>Free Wifi</p>
                                                            </div>
                                                        </Col>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p>No Prepayment</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p>Flexible Rate</p>
                                                            </div>
                                                        </Col>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p>Shower-bathtub combination</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p style={{
                                                                fontWeight: "bold",
                                                                }}>Average Per Night</p>
                                                            </div>
                                                        </Col>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p style={{
                                                                    fontWeight: "bold",
                                                                }}>LKR 61,923.20</p>
                                                            </div>
                                                        </Col>
                                                    </Row>

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

export default RoomReservationPage;
