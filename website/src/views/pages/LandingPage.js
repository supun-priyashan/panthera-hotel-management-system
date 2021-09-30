import React from "react";

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
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";

function LandingPage() {
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
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <LandingPageHeader />
        <div className="section section-team text-center" style={{marginTop:'0px', paddingTop:'40px'}}>
          <Container >
            <h2 className="sub-header" >Our guests enjoy the best of everything</h2>
            <div className="team" style={{marginTop:'40px'}}>
              <Row>
                <Col md="3" >
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/Front desk.jpg").default}
                      style={{
                        flexShrink: "0",
                        minWidth: "70%",
                        minHeight: "70%"
                      }}
                    ></img>
                    <h5 className="image-title">24/7 Front Desk</h5>
                  </div>
                </Col>
                <Col md="3" >
                  <div className="team-player">
                    <img
                        alt="..."
                        className="rounded-circle img-fluid img-raised"
                        src={require("assets/img/restaurant-bar.jpg").default}
                        style={{
                          flexShrink: "0",
                          minWidth: "70%",
                          minHeight: "70%"
                        }}
                    ></img>
                    <h5 className="image-title">Restaurant & Bar</h5>
                  </div>
                </Col>
                <Col md="3" >
                  <div className="team-player">
                    <img
                        alt="..."
                        className="rounded-circle img-fluid img-raised"
                        src={require("assets/img/spa.jpg").default}
                        style={{
                          flexShrink: "0",
                          minWidth: "70%",
                          minHeight: "70%"
                        }}
                    ></img>
                    <h5 className="image-title">Spa Treatments</h5>
                  </div>
                </Col>
                <Col md="3" >
                  <div className="team-player">
                    <img
                        alt="..."
                        className="rounded-circle img-fluid img-raised"
                        src={require("assets/img/car.png").default}
                        style={{
                          flexShrink: "0",
                          minWidth: "70%",
                          minHeight: "70%"
                        }}
                    ></img>
                    <h5 className="image-title">Transfer Services</h5>
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

export default LandingPage;
