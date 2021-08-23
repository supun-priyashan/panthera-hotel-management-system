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
    Col, FormGroup,
} from "reactstrap";

// core components
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import IndexHeader from "../../components/Headers/IndexHeader";
import RoomsHeader from "../../components/Headers/HallReservationsHeader";
import axios from "axios";
import Datetime from "react-datetime";

function HallReservationPage() {
    const [firstFocus, setFirstFocus] = useState(false);
    const [lastFocus, setLastFocus] = useState(false);

    const [hallReservations,setHallReservations] = useState([]);

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

    return (
        <>
            <IndexNavbar />
            <div className="wrapper">
                <RoomsHeader />
                <div className="section section-about-us">
                    <Container>

                        <div className="team">
                            <Row>
                                <Col className="ml-auto mr-auto text-left" md="6">
                                    <div className="team-player">

                                        <p className="category text-info">Venue</p>
                                        <h2 className="title">Wedding Hall</h2>
                                        <p className="category text-info">Colombo, Sri Lanka</p>

                                        <p className="description">
                                            You can write here details about one of your team members.
                                            You can give more details about what they do. Feel free to
                                            add some links for people to be able to follow them outside the site.
                                        </p>
                                        <hr></hr>
                                        <h4 className="title">Supported Events</h4>
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
                                        <hr></hr>
                                        <h4 className="title">Features</h4>

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
                                                height: "35rem",
                                                margin: "10px",
                                            }} >
                                                <div className="card-body">
                                                    <h5 className="title">BOOK NOW FOR LKR 1,200,000.00</h5>
                                                    <Row>
                                                        <Col lg="6" sm="6">
                                                            <p className="category">Form Controls</p>
                                                            <FormGroup>
                                                                <Input
                                                                    defaultValue=""
                                                                    placeholder="Regular"
                                                                    type="text"
                                                                ></Input>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col lg="6" sm="6">
                                                            <p className="category">Form Controls</p>
                                                            <FormGroup>
                                                                <Input
                                                                    defaultValue=""
                                                                    placeholder="Regular"
                                                                    type="text"
                                                                ></Input>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <p className="category">Pick dates to reveal packages</p>
                                                    <Row>
                                                        <Col lg="6" sm="6">
                                                                    <div className="datepicker-container">
                                                                        <FormGroup>
                                                                            <Datetime
                                                                                timeFormat={false}
                                                                                inputProps={{ placeholder: "ArrivalDate Picker" }}
                                                                            />
                                                                        </FormGroup>
                                                                    </div>
                                                                </Col>


                                                                <Col lg="6" sm="6">
                                                                    <div className="datepicker-container">
                                                                        <FormGroup>
                                                                            <Datetime
                                                                                timeFormat={false}
                                                                                inputProps={{ placeholder: "DepatureDate Picker" }}
                                                                            />
                                                                        </FormGroup>
                                                                    </div>
                                                        </Col>
                                                    </Row>
                                                    <Button
                                                        block
                                                        className="btn-round"
                                                        color="info"
                                                        href="#pablo"
                                                        onClick={(e) => e.preventDefault()}
                                                        size="lg"
                                                    >
                                                        Send Message
                                                    </Button>
                                                    <hr></hr>
                                                    <p className="category text-info">Cancellation Terms</p>

                                                    <p className="description">
                                                        Zero-refund: no refund after booking
                                                    </p>
                                                    <p className="description">
                                                        This policy means that you will be reimbursed any payment that you have made if you cancel the reservation made.
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
