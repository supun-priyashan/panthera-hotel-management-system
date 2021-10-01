import React, {Fragment} from "react";

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
import ContactUsPageHeader from "components/Headers/ContactUsPageHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

function ContactUsPage() {
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    React.useEffect(() => {
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

    const defaultCenter = { lat: 6.895899, lng: 79.852562 };

    const defaultOptions = { scrollwheel: false };

    const RegularMap = withScriptjs(
        withGoogleMap(props => (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={ defaultCenter }
                defaultOptions={ defaultOptions }
            >
                <Marker position={ defaultCenter } />
            </GoogleMap>
        ))
    );

    const loadingElementStyle = { height: '100%' };
    const containerElementStyle = { height: '280px' };
    const mapElementStyle = { height: '100%' };

        return (
            <>
                <IndexNavbar/>
                <div className="wrapper">
                    <ContactUsPageHeader/>
                    <div className="section section-team text-center">
                        <Container>
                            <h2 className="title">Contact Us</h2>
                            <div className="card" style={{
                                width: "72rem",
                                height: "50rem",
                                margin: "10px",
                                backgroundColor: "#F0F1F0",
                            }}>
                                <div className="team">
                                    <div className={'container'}>
                                        <Fragment>
                                            <div className="card-body">
                                                {/*<h6 className="category" style={{
                                                color: "black",
                                                fontWeight: 'bold',
                                                fontSize: 15,
                                            }} >Stay Summary:</h6>*/}
                                                <Row>
                                                    <Col className="ml-auto mr-auto text-left" md="6">
                                                        <img
                                                            alt="..."
                                                            className="img-raised"
                                                            src={require("../../assets/img/contact 2.jpg").default}
                                                        />
                                                    </Col>
                                                    <Col className="ml-auto mr-auto text-left" md="6">
                                                        <br/>
                                                        <div>
                                                            <div className="team-player">
                                                                <h4 className="category" style={{
                                                                    color: "#404A45"
                                                                }}>Cooperate contact</h4>
                                                                <h5 className="category" style={{
                                                                    color: "#404A45"
                                                                }}>Head Office Address</h5>
                                                                <div style={{
                                                                    color: "#404A45"
                                                                }}>Panthera Hotel Management Limited
                                                                    <br/>
                                                                    117,Sir Philip Gunawardhene Mawatha,<br/>Colombo
                                                                    05, <br/>Sri Lanka.
                                                                    <br/>+94-112158657 <br/> +94-11215882
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="team-player">
                                                                <h4 className="category" style={{
                                                                    color: "#404A45"
                                                                }}>Panthera Hotels & Resorts - City Section</h4>
                                                                <h5 className="category" style={{
                                                                    color: "#404A45"
                                                                }}>City Center Address</h5>
                                                                <div style={{
                                                                    color: "#404A45"
                                                                }}>115,Wickramasinghe Place,
                                                                    <br/>
                                                                    Colombo 08,<br/>Sri Lanka.
                                                                    <br/>+94-116588544 <br/> +94-119985712
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="team-player">
                                                                <h4 className="category" style={{
                                                                    color: "#404A45"
                                                                }}>Panthera Hotels & Resorts - Maldives</h4>
                                                                <h5 className="category" style={{
                                                                    color: "#404A45"
                                                                }}>Maldives Center Address</h5>
                                                                <div style={{
                                                                    color: "#404A45"
                                                                }}>961/A,Maizan Avenue,
                                                                    <br/>
                                                                    Soson Magu,Male,<br/>Republic of Maldives.
                                                                    <br/>Hotline: +960-78256982
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </Col>
                                                </Row>


                                            </div>
                                        </Fragment>
                                    </div>
                                </div>
                            </div>
                            {/*map*/}
                            <div className="card" style={{
                                width: "72rem",
                                height: "17rem",
                                margin: "10px",
                                backgroundColor: "#F0F1F0",
                            }}>
                                <RegularMap
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQ8znaRDAxkGkes0LgdobrTlh0EsNGeBo"
                                    loadingElement={<div style={ loadingElementStyle } />}
                                    containerElement={<div style={ containerElementStyle } />}
                                    mapElement={<div style={ mapElementStyle } />}
                                >
                                </RegularMap>
                            </div>
                        </Container>
                    </div>
                    <TransparentFooter/>
                </div>
            </>
        );
}
export default ContactUsPage;
