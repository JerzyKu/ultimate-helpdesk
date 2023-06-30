import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

//bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

//font awsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faFrog } from '@fortawesome/free-solid-svg-icons'

export default function NavbarComponent() {
    console.log(window.location.pathname);
    return (
        <>
            <Navbar expand="lg" className="mb-3" style={{ backgroundColor: '#006A4E', color: 'white' }}>
                <Container>
                    <Navbar.Brand as={Link} to="/"><FontAwesomeIcon icon={faFrog} bounce style={{ color: "#0b3805", }} /> Ultimate HelpDesk</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <CustomLink to="/" >Home</CustomLink>
                            <CustomLink to="/assets" active>Assets</CustomLink>
                            <CustomLink to="/employees" >Employees</CustomLink>
                            <CustomLink to="/longue" >Longue</CustomLink>
                            <CustomLink to="/account" ><FontAwesomeIcon icon={faCircleUser} /> Username</CustomLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname }) // end: true 
    return (
        <Nav.Link as={Link} to={to} {...props} active={isActive}>{children}</Nav.Link>
    )
}