import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataService, GetCookie, Notify } from '../../../hooks/hooks'
import { Button } from '../../component'

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const token = GetCookie(navigate)
            const res = await DataService.post('/auth/seller', { token })
            if (res.message) navigate('/user/dashboard')
            Notify(res)
        } catch (error) {
            console.error('handleLogin : ' + error)
        }
    }
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
                                        </li>
                                        <li> <Link to="/browse-products">Products</Link> </li>
                                    </ul>
                                    <div className="searchbar-part">
                                        <div className="back-login">
                                            <Link to="/login">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-unlock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
                                                Log In
                                            </Link>
                                        </div>
                                        <Button
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