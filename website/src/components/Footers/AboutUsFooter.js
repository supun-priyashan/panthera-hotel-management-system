import React from "react";

// reactstrap components
import {Button, Col, Container} from "reactstrap";

// core components

function AboutUsFooter() {

    return (
        <>
            <div className="page-header page-header-small">
                <div className="content-center">
                    <Container>
                        <Col className="text-left" md="6">

                            <h4 className="title">Some Interesting Facts About Us</h4>

                            <p className="text">
                                Enjoy world-class service amidst tranquil surroundings, coupled with inspirational design and transformative experiences in some of the world's finest urban addresses and resort destinations.                            </p>

                        </Col>
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
