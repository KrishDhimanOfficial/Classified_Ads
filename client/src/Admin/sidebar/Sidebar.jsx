import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="nav flex-column">
            <Link className="nav-link active" to="/user/dashboard">
                <i className="fas fa-user"></i>
                Dashboard
            </Link>
            <Link className="nav-link" to="#">
                <i className="fas fa-th-list"></i>
                My Listings
            </Link>
            <Link className="nav-link" to="#">
                <i className="fas fa-wallet"></i>
                Wallet
            </Link>
            <Link className="nav-link" to="#">
                <i className="fas fa-user-circle"></i>
                Profile
            </Link>
            <Link className="nav-link" to="#">
                <i className="fas fa-cog"></i>
                Settings
            </Link>
        </div>
    )
}

export default Sidebar
