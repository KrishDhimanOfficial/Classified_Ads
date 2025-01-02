import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <header id="back-header" className="back-header back-header-three header-profile">
                <div className="menu-part">
                    <div className="container">
                        <div className="back-main-menu">
                            <nav>
                                <div className="menu-toggle">
                                    <div className="logo">
                                        <Link to='/' className="logo-text">
                                            <img src="#" alt="logo" />
                                        </Link>
                                    </div>
                                    <button type="button" id="menu-btn">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                                <div className="back-inner-menus">
                                    <ul id="backmenu" className="back-menus back-sub-shadow">
                                        <li className="mega-inner">
                                            <Link to='/'>Home</Link>
                                            <ul className="mega-menu">
                                                <li>
                                                    <div className="mega-menu-container">
                                                        <div className="menu-item">
                                                            <div className="sub-menu-mega">
                                                                <div className="menu-title">MultiPages</div>
                                                                <div><Link to="/">Univercity</Link></div>
                                                                <div><Link to="/">School One</Link></div>
                                                                <div><Link to="/">School Two</Link></div>
                                                                <div><Link to="/">Kids</Link></div>
                                                            </div>
                                                        </div>
                                                        <div className="menu-item">
                                                            <div className="sub-menu-mega">
                                                                <div className="menu-title">MultiPages</div>
                                                                <div><Link to="/">Languages School</Link></div>
                                                                <div><Link to="/">Distant Learning</Link></div>
                                                                <div><Link to="/">Restaurant</Link></div>
                                                                <div><Link to="/">Courses Hub </Link></div>
                                                            </div>
                                                        </div>
                                                        <div className="menu-item">
                                                            <div className="sub-menu-mega">
                                                                <div className="menu-title">MultiPages</div>
                                                                <div><Link to="/">UX/UI Courses</Link></div>
                                                                <div><Link to="/">Online School</Link></div>
                                                                <div><Link to="/">Online Tutor</Link></div>
                                                                <div><Link to="/">Freelancer Courses</Link></div>
                                                            </div>
                                                        </div>
                                                        <div className="menu-item">
                                                            <div className="sub-menu-mega">
                                                                <div className="menu-title">MultiPages</div>
                                                                <div><Link to="/">Courses Archive</Link></div>
                                                                <div><Link to="/">Gym Coach</Link></div>
                                                                <div><Link to="/">One Instructor</Link></div>
                                                                <div><Link to="/">Online Training</Link></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li> <Link to="#">Pages</Link>
                                            <ul>
                                                <li> <Link to="/">About</Link></li>
                                                <li> <Link to="/">Instructor</Link></li>
                                                <li> <Link to="/">Profile</Link></li>
                                                <li> <Link to="/">Sign In</Link></li>
                                                <li> <Link to="/">Sign Up</Link></li>
                                                <li> <Link to="/">Error 404</Link></li>
                                            </ul>
                                        </li>
                                        <li> <a href="#">Contact</a></li>
                                    </ul>
                                    <div className="searchbar-part">
                                        <div className="back-login">
                                            <Link to="/login">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-unlock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
                                                Log In
                                            </Link>
                                        </div>
                                        <Link to="/" className="back-btn">
                                            Post Your Ad
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar