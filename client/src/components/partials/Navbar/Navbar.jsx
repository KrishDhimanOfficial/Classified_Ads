import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataService, GetCookie } from '../../../hooks/hooks'
import { useSelector } from 'react-redux'
import { BTN, Image } from '../../component'
import config from '../../../../config/config'

const Navbar = () => {
    const navigate = useNavigate()
    const settings = useSelector(state => state.setting)

    const handleLogin = async () => {
        try {
            const res = await DataService.post('/auth/seller', { token: GetCookie(navigate) })
            if (res.message) navigate('/user/add-product')
        } catch (error) {
            console.error('handleLogin : ' + error)
        }
    }
    const clearCookie = () => { localStorage.clear() }
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
                                            <Image
                                                src={`${config.site_img_path}/${settings.setting.logo}`}
                                                alt="logo"
                                                style={{ height: '60px' }}
                                            />
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
                                        </li>
                                        <li>
                                            <Link to="/browse-products">Listings</Link>
                                        </li>
                                    </ul>
                                    <div className="searchbar-part">
                                        <div className="back-login">
                                            <Link to={'/login'} onClick={() => clearCookie()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-unlock">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                                                </svg>
                                                {sessionStorage.getItem('seller_token') ? 'Log Out' : 'Log In'}
                                            </Link>
                                        </div>
                                        <BTN
                                            type={'button'}
                                            text={' Post Your Ad'}
                                            onClick={() => handleLogin()}
                                            className="back-btn"
                                        />
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