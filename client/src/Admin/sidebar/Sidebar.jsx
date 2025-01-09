import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="nav flex-column">
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user/dashboard">
                <i className="fas fa-user me-3"></i>
                Dashboard
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user1">
                <i className="fas fa-th-list me-3"></i>
                My Listings
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user2">
                <i className="fas fa-wallet me-3"></i>
                Wallet
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user/profile">
                <i className="fas fa-user-circle me-3"></i>
                Profile
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user3">
                <i className="fas fa-cog me-3"></i>
                Settings
            </NavLink>
        </div>
    )
}

export default Sidebar
