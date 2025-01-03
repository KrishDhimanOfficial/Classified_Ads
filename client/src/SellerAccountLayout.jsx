import React, { useEffect } from 'react'
import { Sidebar } from './Admin/admin'
import { Footer, Navbar } from './components/component'
import { Outlet, useNavigate } from 'react-router-dom'
import { GetCookie } from './hooks/hooks'
import { ToastContainer } from 'react-toastify'

const SellerAccountLayout = () => {
    const navigate = useNavigate()
    return (
        <>
            <ToastContainer />
            <title>Dashboard</title>
            <Navbar />
            <div className="container pt-120 pb-90">
                <div className="row">
                    <div className="col-md-3">
                        <div className="sidebar">
                            <Sidebar />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SellerAccountLayout