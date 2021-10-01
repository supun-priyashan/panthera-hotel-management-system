import React, {Fragment, useEffect, useState} from "react";
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
import AboutUsFooter from "components/Footers/AboutUsFooter";
import IndexHeader from "../../components/Headers/IndexHeader";
import axios from "axios";
import {useHistory} from "react-router";
import ColoredNavbar from "../../components/Navbars/ColoredNavbar";


function AboutUsPage(props) {

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

    return (
        <>
            <ColoredNavbar />
            <div className="wrapper">

                <div className="section section-team text-center">
                    <Container>

                        <div className="separator separator-primary"></div>
                        <div className="section-story-overview">
                            <Row>
                                <Col className="ml-auto mr-auto text-left" md="6">

                                    <h2 className="title">About The Panthera</h2>

                                    <p className="description">
                                        The story of Panthera Hotel Colombo which opened its doors in 1989 is a splendid tale of continual improvement of product and the highest standards of quality in hospitality.
                                    </p>
                                    <p className="description">
                                        Having embraced over 3 decades of expertise in hospitality our vision and beliefs are firmly grounded in extending a true personalized service to all our guests, laced with an unforgettable luxury hotel experience.
                                    </p>
                                </Col>
                                <Col className="ml-auto mr-auto text-left" md="5">

                                    <div
                                        className="image-container"
                                        style={{
                                            height: "23rem",
                                            backgroundImage:
                                                "url(" + require("assets/img/aboutus1.jpg").default + ")",
                                        }}
                                    ></div>

                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>

                <AboutUsFooter/>
                <TransparentFooter/>
            </div>
        </>
    );
}

export default AboutUsPage;
