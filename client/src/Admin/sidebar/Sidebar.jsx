import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="nav flex-column">
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user/dashboard">
                <i className="fas fa-user"></i>
                Dashboard
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user1">
                <i className="fas fa-th-list"></i>
                My Listings
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user2">
                <i className="fas fa-wallet"></i>
                Wallet
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user/dashboard/profile">
                <i className="fas fa-user-circle"></i>
                Profile
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user3">
                <i className="fas fa-cog"></i>
                Settings
            </NavLink>
        </div>
    )
}

export default Sidebar
