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
    const [bookedBeds, setBookedBeds] = useState('');
    const [bookedGuests, setBookedGuests] = useState('');


    const [roomReservations,setRoomReservations] = useState([]);

    const [name,setName] = useState('');
    const [type,setType] = useState('');
    const [space, setSpace] = useState('');
    const [guests, setGuests] = useState('');
    const [beds, setBeds] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [facilities, setFacilities] = useState([]);
    const [image, setImage] = useState('');
    const [id, setId] = useState('');

    const [isLoading,setIsLoading] = useState(true);

    const history = useHistory();
    let dates = history.location.state;

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
        console.log(dates)
        axios.get('http://localhost:8080/rooms/'+dates.roomId).
        then((response) => {
            if(response.data.success) {

                console.log(response.data.room);
                const data = response.data.room;

                setName(data.roomName);
                setType(data.type);
                setSpace(data.space);
                setGuests(data.guests);
                setBeds(data.beds);
                setPrice(data.price);
                setDescription(data.description);
                setFacilities(data.facilities);
                setImage(data.image);
                setId(data._id);

                setIsLoading(false);


                console.log(name);

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
        console.log(arrival,"-",departureDate,"-",bookedBeds,"-",bookedGuests);
        history.push({
            pathname: '/confirm/rooms',
            state: {
                arrival:arrival,
                departure:departureDate,
                beds:bookedBeds,
                guests:bookedGuests,

            } // your data array of objects
        })
    }

    return isLoading?(
        <>
            <IndexNavbar />
            <div className="wrapper">
                <TransparentFooter/>
            </div>
        </>
    ):(
        <>
            <IndexNavbar />
            <div className="wrapper">
                <RoomReservationsHeader roomName={name} img={image} />

                <div className="section section-team text-center">
                    <Container>
                        <div className="team">
                            <Row>
                                <Col className="ml-auto mr-auto text-left" md="5">
                                    <div className="team-player">

                                        <h2 className="title">ABOUT THIS ROOM</h2>

                                        <p className="description">
                                            {description}
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
                                                        onChange={(e) => {setBookedBeds(e.target.value)}}
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
                                                        onChange={(e)=>{setBookedGuests(e.target.value)}}
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
                                                    {facilities.length > 0 && facilities.map((item,index)=>{
                                                        return(
                                                            <Row>
                                                                <Col className="ml-auto mr-auto text-left" md="4">
                                                                    <div className="team-player">
                                                                        <p>{item}</p>
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                        )
                                                    })}
                                                    <br></br>
                                                    <br></br>
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
                                                                }}>{price}</p>
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
