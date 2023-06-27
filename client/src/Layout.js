import React from 'react'
import Navbar from './components/NavbarComponent'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
