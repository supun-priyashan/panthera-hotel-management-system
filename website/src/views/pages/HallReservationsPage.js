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
    Col, FormGroup, Form,
} from "reactstrap";

// core components
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import IndexHeader from "../../components/Headers/IndexHeader";
import RoomsHeader from "../../components/Headers/HallReservationsHeader";
import axios from "axios";
import Datetime from "react-datetime";
import HallReservationsHeader from "../../components/Headers/HallReservationsHeader";
import {useHistory} from "react-router";

function HallReservationPage() {
    const [guests, setGuests] = useState('');
    const [eventType, setEventType] = useState('Party');
    const [arrival, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');

    const [hallReservations,setHallReservations] = useState([]);

    const [option,setOption] = useState()

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
        axios.get('http://localhost:8080/hallReservations').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.hallReservations);
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
                setHallReservations(response.data.hallReservations);
                setTimeout(() => console.log(hallReservations.length),5000)
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])


    function onSubmit(e) {
        console.log(arrival,"-",departureDate,"-",eventType,"-",guests);
        history.push({
            pathname: '/confirm/halls',
            state: {
                arrival:arrival,
                departure:departureDate,
                guests:guests,
                eventType: eventType,
            } // your data array of objects
        })
    }

    return (
        <>
            <IndexNavbar />
            <div className="wrapper">
                <HallReservationsHeader />
                <div className="section section-about-us">
                    <Container>

                        <div className="team">
                            <Row>
                                <Col className="ml-auto mr-auto text-left" md="6">
                                    <div className="team-player">

                                        <p className="category" style={{
                                            color: "black",
                                        }}>Venue</p>
                                        <h2 className="title">Wedding Hall</h2>
                                        <p className="category">Colombo, Sri Lanka</p>

                                        <p className="description">
                                            You can write here details about one of your team members.
                                            You can give more details about what they do. Feel free to
                                            add some links for people to be able to follow them outside the site.
                                        </p>
                                        <hr></hr>
                                        <h5 className="title">Supported Events</h5>
                                        <Row>
                                            <Col className="ml-auto mr-auto text-left" md="4">
                                                <div className="team-player">
                                                    <p>Weddings</p>
                                                </div>
                                            </Col>
                                            <Col className="ml-auto mr-auto text-left" md="4">
                                                <div className="team-player">
                                                    <p>Parties</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <hr/>
                                        <h5 className="title">Features</h5>

                                        <Row>
                                            <Col className="ml-auto mr-auto text-left" md="4">
                                                <div className="team-player">
                                                    <p>Reception area</p>
                                                </div>
                                            </Col>
                                            <Col className="ml-auto mr-auto text-left" md="4">
                                                <div className="team-player">
                                                    <p>Garden</p>
                                                </div>
                                            </Col>
                                            <Col className="ml-auto mr-auto text-left" md="4">
                                                <div className="team-player">
                                                    <p>Car parking</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="ml-auto mr-auto text-left" md="4">
                                                <div className="team-player">
                                                    <p>Projection</p>
                                                </div>
                                            </Col>
                                            <Col className="ml-auto mr-auto text-left" md="4">
                                                <div className="team-player">
                                                    <p>Wifi</p>
                                                </div>
                                            </Col>
                                            <Col className="ml-auto mr-auto text-left" md="4">
                                                <div className="team-player">
                                                    <p>Welcome drinks</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="ml-auto mr-auto text-left" md="4">
                                                <div className="team-player">
                                                    <p>Smoking area</p>
                                                </div>
                                            </Col>
                                            <Col className="ml-auto mr-auto text-left" md="4">
                                                <div className="team-player">
                                                    <p>Security personnel</p>
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
                                                    <p>Handicap access</p>
                                                </div>
                                            </Col>
                                            <Col className="ml-auto mr-auto text-left" md="4">
                                                <div className="team-player">
                                                    <p>Dance floor</p>
                                                </div>
                                            </Col>
                                            <Col className="ml-auto mr-auto text-left" md="4">
                                                <div className="team-player">
                                                    <p>Open bar</p>
                                                </div>
                                            </Col>
                                        </Row>

                                    </div>
                                </Col>
                                <Col className="ml-auto mr-auto text-left" md="6">
                                    <div className={'container'}>
                                        <Fragment>
                                            <div className="card" style={{
                                                width: "35rem",
                                                height: "40rem",
                                                margin: "10px",
                                                backgroundColor: "#F8FCFA",
                                            }} >
                                                <div className="card-body">
                                                    <h5 className="title">BOOK NOW FOR LKR 1,200,000.00</h5>
                                                    <br></br>

                                                    {/*<Form>*/}
                                                    {/*    <div className="form-row">*/}
                                                    {/*        <div className="col-md-6">*/}
                                                    {/*            <label htmlFor="inputEmail4">Guest Count</label>*/}
                                                    {/*            <Input*/}
                                                    {/*                id="guests"*/}
                                                    {/*                name="guests"*/}
                                                    {/*                label="Guest Count"*/}
                                                    {/*                type="number"*/}
                                                    {/*                value={guests}*/}
                                                    {/*                onChange={(e) => {setGuests(e.target.value)}}*/}
                                                    {/*                inputProps={{ placeholder: "Guest Count" }}*/}
                                                    {/*            ></Input>*/}
                                                    {/*            /!*<Input id="inputEmail4" placeholder="Email" type="email"></Input>*!/*/}
                                                    {/*        </div>*/}
                                                    {/*        <div className="col-md-6">*/}
                                                    {/*            <label htmlFor="inputPassword4">Event Type</label>*/}
                                                    {/*            <Input*/}
                                                    {/*                id="eventType"*/}
                                                    {/*                name="eventType"*/}
                                                    {/*                label="Event Type"*/}
                                                    {/*                defaultValue=""*/}
                                                    {/*                type="select"*/}
                                                    {/*                value={eventType}*/}
                                                    {/*                onChange={(e) => {setEventType(e.target.value)}}*/}
                                                    {/*                inputProps={{ placeholder: "Event Type" }}*/}
                                                    {/*            >*/}
                                                    {/*                <option value={"Wedding"}>Wedding</option>*/}
                                                    {/*                <option value={"Party"}>Party</option>*/}
                                                    {/*            </Input>*/}
                                                    {/*            /!*<Input*!/*/}
                                                    {/*            /!*    id="inputPassword4"*!/*/}
                                                    {/*            /!*    placeholder="Password"*!/*/}
                                                    {/*            /!*    type="password"*!/*/}
                                                    {/*            /!*></Input>*!/*/}
                                                    {/*        </div>*/}
                                                    {/*        <div className="col-md-6">*/}
                                                    {/*            <col>*/}
                                                    {/*            <label htmlFor="inputPassword4">Pick dates to reveal packages</label>*/}
                                                    {/*            <Input*/}
                                                    {/*                id="arrivalDate"*/}
                                                    {/*                name="arrivalDate"*/}
                                                    {/*                label="Arrival Date"*/}
                                                    {/*                type="date"*/}
                                                    {/*                value={arrivalDate}*/}
                                                    {/*                onChange={(e)=>setArrivalDate(e.target.value)}*/}
                                                    {/*                inputProps={{ placeholder: "ArrivalDate Picker" }}*/}
                                                    {/*            />*/}

                                                    {/*        </div>*/}
                                                    {/*        <div className="col-md-6">*/}
                                                    {/*            <Input*/}
                                                    {/*                id="departureDate"*/}
                                                    {/*                name="departureDate"*/}
                                                    {/*                label="Departure Date"*/}
                                                    {/*                type="date"*/}
                                                    {/*                value={departureDate}*/}
                                                    {/*                onChange={(e)=>setDepartureDate(e.target.value)}*/}
                                                    {/*                inputProps={{ placeholder: "DepatureDate Picker" }}*/}
                                                    {/*            />*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*    <Button*/}
                                                    {/*        type="submit"*/}
                                                    {/*        block*/}
                                                    {/*        className="btn-round"*/}
                                                    {/*        color="info"*/}
                                                    {/*        href="#pablo"*/}
                                                    {/*        onClick={onSubmit}*/}
                                                    {/*        size="lg">*/}
                                                    {/*        BOOK NOW*/}
                                                    {/*    </Button>*/}
                                                    {/*</Form>*/}

                                                    <Form>
                                                    <Row>
                                                        <Col lg="6" sm="6">
                                                            <p className="category">Guest Count</p>
                                                            <div>
                                                                <Input
                                                                    id="guests"
                                                                    name="guests"
                                                                    label="Guest Count"
                                                                    type="number"
                                                                    value={guests}
                                                                    onChange={(e) => {setGuests(e.target.value)}}
                                                                    inputProps={{ placeholder: "Guest Count" }}
                                                                ></Input>
                                                            </div>
                                                        </Col>
                                                        <Col lg="6" sm="6">
                                                            <p className="category">Event Type</p>

                                                            <div>
                                                                <Input
                                                                    id="eventType"
                                                                    name="eventType"
                                                                    label="Event Type"
                                                                    type="select"
                                                                    value={eventType}
                                                                    onChange={(e) => {setEventType(e.target.value)}}
                                                                    inputProps={{ placeholder: "Event Type" }}
                                                                >
                                                                    <option value={"Wedding"}>Wedding</option>
                                                                    <option value={"Party"}>Party</option>
                                                                </Input>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <p className="category">Pick dates to reveal packages</p>
                                                    <Row>
                                                        <Col lg="6" sm="6">
                                                                    <div className="datepicker-container">
                                                                        <FormGroup>
                                                                            <Input
                                                                                id="arrivalDate"
                                                                                name="arrivalDate"
                                                                                label="Arrival Date"
                                                                                type="date"
                                                                                value={arrival}
                                                                                onChange={(e)=>setArrivalDate(e.target.value)}
                                                                                inputProps={{ placeholder: "ArrivalDate Picker" }}
                                                                            />
                                                                        </FormGroup>
                                                                    </div>
                                                                </Col>


                                                                <Col lg="6" sm="6">
                                                                    <div className="datepicker-container">
                                                                        <FormGroup>
                                                                            <Input
                                                                                id="departureDate"
                                                                                name="departureDate"
                                                                                label="Departure Date"
                                                                                type="date"
                                                                                value={departureDate}
                                                                                onChange={(e)=>setDepartureDate(e.target.value)}
                                                                                inputProps={{ placeholder: "DepatureDate Picker" }}
                                                                            />
                                                                        </FormGroup>
                                                                    </div>
                                                        </Col>
                                                    </Row>
                                                    <br></br>
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
                                                    <br></br>
                                                    <hr></hr>
                                                    <br></br>
                                                    <p className="category" style={{
                                                        color: "black",
                                                    }}>Cancellation Terms</p>

                                                    <p className="description">
                                                        Zero-refund: no refund after booking
                                                    </p>
                                                    <p className="description">
                                                        This policy means that you will be reimbursed any payment that you have made if you cancel the reservation made
                                                    </p>
                                                    <p className="card-text"></p>
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

export default HallReservationPage;
