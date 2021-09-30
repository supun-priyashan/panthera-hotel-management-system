import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function LandingPageHeader() {
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
              "url(" + require("assets/img/bg6.jpg").default + ")",
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <div className="text-center">
              <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/Panthera1.jpg").default}
                  style={{
                    maxWidth: "30%",
                    maxHeight: "30%"
                  }}
              />
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LandingPageHeader;
