import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Image } from '../../component'

const Footer = () => {
    const settings = useSelector(state => state.setting)
    return (
        <footer id="back-footer" className="back-footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 md-mb-30">
                            <div className="footer-widget footer-widget-1">
                                <div className="footer-logo white">
                                    <Link to="/" className="logo-text">
                                        <Image
                                            src={settings.setting.logo}
                                            alt="logo"
                                            style={{ height: '60px' }}
                                        />
                                    </Link>
                                </div>
                                <h5 className="footer-subtitle">
                                    {settings.setting.desc}
                                </h5>
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
                    </div>
                </div>
            </div>

            <div className="copyright">
                <div className="container">
                    <div className="back-copy-left">@ 2022 All Copyright Reserved. Developed by <Link to="#" className='text-uppercase'>Krish Dhiman</Link></div>
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
