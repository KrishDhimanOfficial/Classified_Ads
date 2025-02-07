import React, { useEffect, useCallback, useState } from 'react'
import { Navbar, Footer } from './components/component'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setProfile } from '../controller/seller.store'
import { setsetting } from '../controller/GNS.store'
import { GetCookie, DataService } from './hooks/hooks'


const Layout = () => {
    const [logo, setlogo] = useState(null)
    const dispatch = useDispatch()

    const fetchDetails = async () => {
        const res = await DataService.get('/settings')
        setlogo(res.logo), dispatch(setsetting(res)), setfavicon()
    }

    const getProfile = useCallback(async () => {
        const res = await DataService.post('/seller/profile', { token: GetCookie() }, {
            headers: {
                Authorization: `Bearer ${GetCookie()}`
            }
        })
        dispatch(setProfile(res))
    })

    const setfavicon = async () => {
        const link = document.createElement('link')
        link.rel = 'icon', link.type = 'image/x-icon', link.href = logo;
        document.head.appendChild(link)
    }

    useEffect(() => { fetchDetails(), getProfile() }, [])
    return (
        <>
            <ToastContainer />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout