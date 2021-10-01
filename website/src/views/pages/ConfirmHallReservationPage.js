import React, {Fragment, useEffect, useLayoutEffect, useState} from "react";
// reactstrap components
import {
    Button,
    Input,
    Container,
    Row,
    Col, FormGroup,
} from "reactstrap";

// core components
import TransparentFooter from "components/Footers/TransparentFooter";
import axios from "axios";
import {useHistory} from "react-router";
import ColoredNavbar from "../../components/Navbars/ColoredNavbar";


function ConfirmHallReservationPage() {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [arrival,setArrival] = useState('');
    const [departure,setDeparture] = useState('');
    const [eventType,setEventType] = useState('');
    const [guests,setGuests] = useState('');

    const [name,setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [id, setId] = useState('');

    const [isLoading,setIsLoading] = useState(true);


    let data;
    let dates = history.location.state;

    useLayoutEffect(() => {
        data = history.location.state;
        console.log("History", data);
    })

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
        console.log(dates)
        axios.get('http://localhost:8080/halls/'+dates.id).
        then((response) => {
            if(response.data.success) {

                console.log(response.data.hall);
                const data = response.data.hall;

                setName(data.hallName);
                setPrice(data.price);
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
        console.log("History data" , dates);

        console.log("data ", data);

        //setTimeout(()=>{
        setArrival(dates.arrival);
        setDeparture(dates.departure);
        setEventType(dates.eventType);
        setGuests(dates.guests);
        //},5000)

        /*axios.get('http://localhost:8080/hallmReservations').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.hallReservations);

                setHallReservations(response.data.hallReservations);
                setTimeout(() => console.log(hallReservations.length),5000)
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })*/
    },[])


    const onSubmit = (e) => {

        e.preventDefault();
        if(!firstName ){
            alert("Firstname is required");
        }else if(!lastName){
            alert("LastName is required");
        }else if(!email){
            alert("Email is required");
        }else if(!mobile) {
            alert("Mobile is required");
        }else {

            const hall = {
                customerName: firstName + " " + lastName,
                email: email,
                contactNumber: mobile,
                arrivalDate: arrival,
                departureDate: departure,
                noOfGuests: guests,
                eventType: eventType,
                hallName: name,
            }

            console.log(hall);

            axios.post('http://localhost:8080/hallReservations', hall)
                .then(response => {
                    if (response.data.success) {
                        alert('Hall Reserved  Successfully')

                    } else {
                        alert('Failed to Reserve the Hall')
                    }

                }).catch(error => {
                alert(error);
            })
        }

    }

    return (
        <>
            <ColoredNavbar />
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
                                                        src={require("assets/img/hallreserve.jpg").default}
                                                    ></img>
                                                </Col>
                                                <Col className="ml-auto mr-auto text-left" md="8">
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <div className="team-player">
                                                        <p className="category" style={{
                                                            color: "#404A45",
                                                        }}>{arrival} / {departure}</p>
                                                    </div>
                                                    <div className="team-player">
                                                        <p className="category" style={{
                                                            color: "#404A45",
                                                        }}>Hall & Guests: {name} hall, {guests} guest(s)</p>
                                                    </div>
                                                    <div className="team-player">
                                                        <p className="category" style={{
                                                            color: "#404A45",
                                                        }}>Event Type: {eventType} </p>
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
                                                height: "30rem",
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
                                                                }}>Total Charges</p>
                                                            </div>
                                                        </Col>
                                                        <Col className="ml-auto mr-auto text-left" md="4">
                                                            <div className="team-player">
                                                                <p className="category" style={{
                                                                    color: "#404A45",
                                                                }}>LKR {price}</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <br></br>

                                                    <Button
                                                        block
                                                        className="btn-round"
                                                        color="info"
                                                        onClick={(e) => onSubmit(e)}
                                                        size="lg"
                                                    >
                                                        BOOK NOW
                                                    </Button>

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

export default ConfirmHallReservationPage;
