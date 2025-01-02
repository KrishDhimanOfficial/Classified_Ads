import React from 'react'
import { Sidebar } from './Admin/admin'
import { Footer, Navbar } from './components/component'

const SellerAccountLayout = () => {
    return (
        <>
            <Navbar />
            <div className="container pt-120 pb-90">
                <div className="row">
                    <div className="col-md-3">
                        <div className="sidebar">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SellerAccountLayout