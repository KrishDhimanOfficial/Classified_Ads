import React, { useEffect, useCallback } from 'react'
import { Navbar, Footer } from './components/component'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setProfile } from '../controller/seller.store'
import { setsetting } from '../controller/GNS.store'
import { GetCookie, DataService } from './hooks/hooks'


const Layout = () => {
    const dispatch = useDispatch()

    const fetchDetails = async () => {
        const res = await DataService.get('/settings')
        const link = document.createElement('link')
        link.rel = 'icon', link.type = 'image/x-icon', link.href = res.logo;
        document.head.appendChild(link)
        dispatch(setsetting(res))
    }

    const getProfile = useCallback(async () => {
        const res = await DataService.post('/seller/profile', { token: GetCookie() }, {
            headers: {
                Authorization: `Bearer ${GetCookie()}`
            }
        })
        dispatch(setProfile(res))
    })

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