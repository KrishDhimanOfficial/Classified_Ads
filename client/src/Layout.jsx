import React, { useEffect } from 'react'
import { Navbar, Footer } from './components/component'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import DataService from './hooks/DataService'
import { useDispatch } from 'react-redux'
import { setsetting } from '../controller/GNS.store'


const Layout = () => {
    const dispatch = useDispatch()
    const fetchDetails = async () => {
        const res = await DataService.get('/settings')
        dispatch(setsetting(res))
    }

    useEffect(() => {  fetchDetails() }, [])
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