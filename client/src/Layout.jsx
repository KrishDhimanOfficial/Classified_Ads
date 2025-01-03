import React from 'react'
import { Navbar, Footer } from './components/component'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
    return (
        <>
            <ToastContainer />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout