import React, { useEffect } from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

//bootstrap
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";

//font awsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrog, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function NavbarComponent() {
  // console.log(window.location.pathname);
  const navigate = useNavigate();
  const { username, firstName, isAdmin } = useAuth()

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess]);

  let logoutErrorAlert = null;
  if (isError) {
    logoutErrorAlert = <Alert variant="danger">error: {JSON.stringify(error)}</Alert>;
  }

  return (
    <>{logoutErrorAlert}
      <Navbar
        expand="lg"
        className="m-2 rounded-1"
        style={{ backgroundColor: "#006A4E", color: "white" }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/home">
            <FontAwesomeIcon
              icon={faFrog}
              bounce
              style={{ color: "#0b3805" }}
            />{" "}
            Ultimate HelpDesk
          </Navbar.Brand> 
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <CustomLink to="/home">Home</CustomLink>
              <CustomLink to="/assets">
                Assets
              </CustomLink>
              {isAdmin && <CustomLink to={`/users`}>Users</CustomLink>}
              
              <NavDropdown title={firstName ? firstName : username} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={`/account`}>
                  Account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => sendLogout()}>
                  <FontAwesomeIcon icon={faRightFromBracket} /> LogOut
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: false}); // 
  return (
    <Nav.Link as={Link} to={to} {...props} active={isActive}>
      {children}
    </Nav.Link>
  );
}
