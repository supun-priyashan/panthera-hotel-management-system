import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function RoomReservationPageHeader() {
    let pageHeader = React.createRef();

    React.useEffect(() => {
        if (window.innerWidth > 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                pageHeader.current.style.transform =
                    "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    });
    return (
        <>
            <div className="page-header page-header-small">
                <div
                    className="page-header-image"
                    style={{
                        backgroundImage:
                            "url(" + require("assets/img/roomReserve.jpg").default + ")",
                    }}
                    ref={pageHeader}
                ></div>

                <div className="content-center">
                    <Container>
                        <h1 className="title">DELUXE DOUBLE ROOM</h1>
                    </Container>
                </div>
                <Container>
                    <div className="content">
                        <div className="social-description">
                            <h2>26</h2>
                            <p>29m2</p>
                        </div>
                        <div className="social-description">
                            <h2>26</h2>
                            <p>2 Beds</p>
                        </div>
                        <div className="social-description">
                            <h2>48</h2>
                            <p>2 Guests</p>
                        </div>
                        <div className="social-description">
                            <h2>48</h2>
                            <p>1 Bathroom</p>
                        </div>
                    </div>
                </Container>

            </div>
        </>
    );
}

export default RoomReservationPageHeader;
