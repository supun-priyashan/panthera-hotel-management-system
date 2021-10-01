import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function HallsHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        if(pageHeader.current)
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
              "url(" + require("assets/img/bg2.jpg").default + ")",
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">MEET & CELEBRATE</h1>
            <div className="text-center">
              Choose from our elegant & majestic venues
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default HallsHeader;
