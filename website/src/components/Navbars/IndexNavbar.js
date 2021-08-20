import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {

  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              href="https://demos.creative-tim.com/now-ui-kit-react/#/index?ref=nukr-index-navbar"
              target="_blank"
              id="navbar-brand"
            >
              <div className={'nav-logo'}>
                panthera
              </div>
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              Panthera Hotel PVT (LTD)
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink
                    to="/" tag={Link}
                >
                  <p>Home</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                    to="/" tag={Link}
                >
                  <p>Accommodation</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                    to="/" tag={Link}
                >
                  <p>Halls</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                    to="/" tag={Link}
                >
                  <p>Dining</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                    to="/" tag={Link}
                >
                  <p>Contact Us</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                    to="/" tag={Link}
                >
                  <p>About</p>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
