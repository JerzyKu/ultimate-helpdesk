import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrog } from '@fortawesome/free-solid-svg-icons'

export default function NavbarComponent() {
    return (
        <>
            {/* <nav className="navbar navbar-expand-lg bg-primary-subtle">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Ultimate HelpDesk</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" to={'/'}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/assets'}>Assets</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/employees'}>Employees</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <br /> */}
            <Navbar expand="lg" className="bg-success">
                <Container>
                    <Navbar.Brand as={Link} to="/"><FontAwesomeIcon icon={faFrog} bounce style={{ color: "#0b3805", }} /> Ultimate HelpDesk</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" >Home</Nav.Link>
                            <Nav.Link as={Link} to="/assets" active>Assets</Nav.Link>
                            <Nav.Link as={Link} to="/employees" >Employees</Nav.Link>
                            {/* <Nav.Link href="/assets">Assets</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </>

    )
}

