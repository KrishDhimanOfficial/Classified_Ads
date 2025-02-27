import { useCallback, useEffect, useState } from 'react'
import { Sidebar } from './Admin/admin'
import { Footer, Navbar } from './components/component'
import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import DataService from './hooks/DataService'
import GetCookie from './hooks/GetCookie'
import Notify from './hooks/Notify'
import { setProfile } from '../controller/seller.store'
import { setsetting } from '../controller/GNS.store'

const SellerAccountLayout = () => {
    const [logo, setlogo] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getProfile = useCallback(async () => {
        const res = await DataService.post('/seller/profile', { token: GetCookie(navigate) }, {
            headers: {
                Authorization: `Bearer ${GetCookie(navigate)}`
            }
        })
        Notify(res), dispatch(setProfile(res))
    })

    const fetchDetails = async () => {
        const res = await DataService.get('/settings')
        const link = document.createElement('link')
        link.rel = 'icon', link.type = 'image/x-icon', link.href = res.logo;
        document.head.appendChild(link)
        dispatch(setsetting(res))
    }
    
    useEffect(() => { getProfile(), fetchDetails() }, [])
    return (
        <>
            <Toaster />
            <ToastContainer />
            <title>Dashboard</title>
            <Navbar />
            <div className="container pt-120 pb-90">
                <div className="row g-3">
                    <div className="col-md-3 d-md-block d-none">
                        <div className="sidebar">
                            <Sidebar />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SellerAccountLayout