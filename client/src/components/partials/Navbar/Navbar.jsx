import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataService, GetCookie } from '../../../hooks/hooks'
import { useSelector } from 'react-redux'
import { BTN, Image } from '../../component'
import config from '../../../../config/config'
import Dropdown from 'react-bootstrap/Dropdown'

const Navbar = () => {
    const navigate = useNavigate()
    const settings = useSelector(state => state.setting)
    const seller = useSelector(state => state.seller)
    const [islogin, setlogin] = useState(false)
    const [wishListVisible, setWishListVisible] = useState(false)

    const handleLogin = async () => {
        try {
            const res = await DataService.post('/auth/seller', { token: GetCookie(navigate) }, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
            if (res.error) navigate('/login')
            if (res.message) navigate('/user/add-product')
        } catch (error) {
            console.error('handleLogin : ' + error)
        }
    }
    const clearCookie = () => { localStorage.clear() }

    useEffect(() => {
        if (seller) setlogin(true)
        const token = localStorage.getItem('seller_token')
        token ? setWishListVisible(true) : setWishListVisible(false)
    }, [])
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
                                                src={settings.setting.logo}
                                                alt="logo"
                                                style={{ height: '60px' }}
                                            />
                                        </Link>
                                    </div>
                                    <Dropdown className='d-block d-md-none'>
                                        <Dropdown.Toggle variant="primary" id="menu-btn">
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/">Home</Dropdown.Item>
                                            <Dropdown.Item href="/browse-products">Listings</Dropdown.Item>
                                            {
                                                islogin && (
                                                    <>
                                                        <Dropdown.Item href="/user/dashboard">Dashboard</Dropdown.Item>
                                                        <Dropdown.Item href="/user/my-wishlist">Favourties</Dropdown.Item>
                                                        <Dropdown.Item href="/user/my-listing">My Listing</Dropdown.Item>
                                                        <Dropdown.Item href="/user/my-wallet">Wallet</Dropdown.Item>
                                                        <Dropdown.Item href="/user/profile">Profile</Dropdown.Item>
                                                        <Dropdown.Item href="/user/settings">settings</Dropdown.Item>
                                                    </>
                                                )
                                            }
                                            <Dropdown.Item href="/login"> {islogin ? 'Logout' : 'Login'} </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="back-inner-menus">
                                    <ul id="backmenu" className="back-menus back-sub-shadow d-lg-block d-none">
                                        <li className="mega-inner">
                                            <Link to='/'>Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/browse-products">Listings</Link>
                                        </li>
                                        {
                                            wishListVisible && (
                                                <li>
                                                    <Link to="/user/my-wishlist">Favourties Ads</Link>
                                                </li>
                                            )
                                        }
                                    </ul>
                                    <div className="searchbar-part">
                                        <div className="back-login">
                                            <Link to={'/login'} onClick={() => clearCookie()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-unlock">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                                                </svg>
                                                {localStorage.getItem('seller_token') ? 'Log Out' : 'Log In'}
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

export default React.memo(Navbar)