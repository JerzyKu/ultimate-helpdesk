import React from 'react'
import Navbar from './NavbarComponent'
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

export default function Layout() {
    return (
        <>
            <Navbar />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}
