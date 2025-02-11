import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'

const Sidebar = () => {
    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.5 }}
            className="nav flex-column"
        >
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user/dashboard">
                <i className="fas fa-user me-3"></i>
                Dashboard
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user/my-listing">
                <i className="fas fa-th-list me-3"></i>
                My Listings
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user/my-wishlist">
                <i className="fa-solid fa-star me-3"></i>
                My WishList
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user/payments">
                <i className="fas fa-wallet me-3"></i>
                Payments History
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user/profile">
                <i className="fas fa-user-circle me-3"></i>
                Profile
            </NavLink>
            <NavLink className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`} to="/user/settings">
                <i className="fas fa-cog me-3"></i>
                Settings
            </NavLink>
        </motion.div>
    )
}

export default Sidebar
