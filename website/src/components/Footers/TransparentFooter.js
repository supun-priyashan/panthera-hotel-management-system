/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer footer-default">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href=""
                target="_blank"
              >
                About Us
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by{" "}
          <a
            href="https://github.com/supun-priyashan/panthera-hotel-management-system/tree/master"
            target="_blank"
          >
            REG_WE_64
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default TransparentFooter;
