import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer id="back-footer" className="back-footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 md-mb-30">
                            <div className="footer-widget footer-widget-1">
                                <div className="footer-logo white">
                                    <Link to="/" className="logo-text"> <img src="assets/images/logo.png" alt="logo" /></Link>
                                </div>
                                <h5 className="footer-subtitle">We have lots of courses and programs from the main market experts.</h5>
                            </div>
                        </div>
                        <div className="col-lg-3 md-mb-30">
                            <div className="footer-widget footer-widget-2">
                                <h3 className="footer-title">About Us</h3>
                                <div className="footer-menu">
                                    <ul>
                                        <li><Link to="/about-us">About</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 md-mb-30">
                            <div className="footer-widget footer-widget-2">
                                <h3 className="footer-title">Quick links</h3>
                                <div className="footer-menu">
                                    <ul>
                                        <li><Link to="/browse-products">Browse products</Link></li>
                                        <li><Link to="/browse-products">Browse category</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="footer-widget footer-widget-3">
                                <h3 className="footer-title">Follow us</h3>
                                <ul className="social-links">
                                    <li><Link to="#"><span aria-hidden="true" className="social_facebook"></span></Link></li>
                                    <li><Link to="#"><span aria-hidden="true" className="social_twitter"></span></Link></li>
                                    <li><Link to="#"><span aria-hidden="true" className="social_linkedin"></span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <div className="container">
                    <div className="back-copy-left">@ 2022 All Copyright Reserved. Developed by <a href="#">Krish Dhiman</a></div>
                    <div className="back-copy-right">
                        <ul>
                            <li><Link to="#">Privacy Policy</Link></li>
                            <li><Link to="#">Terms And Conditions</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
