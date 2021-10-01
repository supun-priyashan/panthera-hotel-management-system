import React from "react";

// reactstrap components
import {Button, Col, Container, Row} from "reactstrap";

// core components

function AboutUsFooter() {

    return (
        <>
            <div className="page-header page-header-small">
                <div className="content-center">
                    <Container>
                        <Row>
                        <Col className="text-left" md="8">

                            <h4 className="title">Some Interesting Facts About Us</h4>

                            <p className="text">
                                Enjoy world-class service amidst tranquil surroundings, coupled with inspirational design and transformative experiences in some of the world's finest urban addresses and resort destinations.                            </p>

                        </Col>
                        <Col className="text-left" md="9">

                            <Row>
                                <Col className="ml-auto mr-auto text-left" md="3"><h4 className="title"> 70 Rooms</h4></Col>
                                <Col className="ml-auto mr-auto text-left" md="3"><h4 className="title"> 12 Halls</h4></Col>
                                <Col className="ml-auto mr-auto text-left" md="3"><h4 className="title"> 3 Pools</h4></Col>
                                <Col className="ml-auto mr-auto text-left" md="3"><h4 className="title"> 40 Employees</h4></Col>

                            </Row>


                        </Col>
                        </Row>
                    </Container>
                </div>

                <div
                    className="page-header-image"
                    style={{
                        backgroundImage:
                            "url(" + require("assets/img/aboutus2.jpg").default + ")",
                    }}
                ></div>
            </div>

        </>
    );
}

export default AboutUsFooter;
