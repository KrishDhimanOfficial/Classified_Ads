import React from 'react'
import { Link, } from 'react-router-dom'
import { Image } from '../component'
import bannerIMG from '../../assets/images/slide1.jpg'

const Banner = () => {
    return (
        <div className="home-banner-part">
            <div className="banner-img">
                <Image className="desktop" src={bannerIMG} alt="Banner Image" />
            </div>
            <div className="container">
                <div className="banner-content">
                    <div className="back-sec-title">
                        <h1 className="banner-title">Buy, Sell, and <br /> Discover: Your Trusted <br /> Classified Ads Platform</h1>
                        <p className="banner-desc">A simple way to connect buyers and sellers, promote services, or announce opportunities.</p>
                    </div>
                    <div className="banner-btn pt-15">
                        <Link to="/browse-products" className="back-btn">Discover More Ads</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Banner)
