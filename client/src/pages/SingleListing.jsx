import React, { useEffect, useState } from 'react'
import { BTN, Image } from '../components/component'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DataService } from '../hooks/hooks'
import config from '../../config/config'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import defaultUser from '../assets/images/user.svg'
import { toast } from 'react-toastify'


const SingleListing = () => {
    const navigate = useNavigate()
    const { listing_slug } = useParams()
    const [listing, setlisting] = useState({})
    const [showNUmber, setshownumber] = useState(false)
    const sellerJoinDate = new Date(listing.seller?.createdAt)

    const fetchSingleListing = async () => {
        try {
            const res = await DataService.get(`/single-listing/${listing_slug}`)
            if (res.error) navigate('/not-found')
            setlisting(res[0])
        } catch (error) {
            console.error('fetchSingleListing : ' + error)
        }
    }
    const showNumber = async () => {
        const res = await DataService.post('/auth/seller', { token: localStorage.getItem('seller_token') }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('seller_token')}`
            }
        })
        res.message ? setshownumber(true) : toast.warning('Please Login First!')
    }

    useEffect(() => { fetchSingleListing() }, [])
    return (
        <>
            <title>{listing_slug}</title>
            <div className="back-wrapper">
                <div className="back-wrapper-inner">
                    <div className='back__course__area back__course__page_grid back-courses__single-page pt-120 pb-120'>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <ul className="user-section">
                                        <li className="user">
                                            <span>
                                                <Image
                                                    src={listing.sellerImg || defaultUser}
                                                    className={'h-100'}
                                                    alt="seller" />
                                            </span>
                                            <span>Seller<em> {listing.seller?.username}</em></span>
                                        </li>
                                        <li>Created At: <em>{listing.createdAt}</em></li>
                                        <li>{listing.brand?.title}</li>
                                    </ul>
                                    <div className="image-banner">
                                        <Fade>
                                            {
                                                listing.images?.map((image, i) => (
                                                    <div key={i} >
                                                        <Image
                                                            src={`${config.server_product_img_path}/${image}`}
                                                            style={{ width: '100%', height: '400px', objectFit: 'contain' }}
                                                            className={'rounded-5'}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </Fade>
                                    </div>
                                    <div className="course-single-tab">
                                        <ul className="nav nav-tabs" id="back-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <Link to="#discription" className="nav-link active" id="discriptions" data-bs-toggle="tab" role="tab" aria-controls="discription" aria-selected="true">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark">
                                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                                    </svg>
                                                    Discription
                                                </Link>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <Link to="#features" className="nav-link" id="featuress" data-bs-toggle="tab" role="tab" aria-controls="features" aria-selected="false">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    Features
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="back-tab-content">
                                            <div className="tab-pane fade show active" id="discription" role="tabpanel" aria-labelledby="discription">
                                                <h3>Description</h3>
                                                <p>{listing.description}</p>
                                            </div>
                                            <div className="tab-pane fade" id="features" role="tabpanel" aria-labelledby="features">
                                                <h3>Features</h3>
                                                <ul className="price__course">
                                                    {
                                                        listing.features?.map((feature, i) => (
                                                            <li key={i} className='d-flex gap-2 fs-5'>
                                                                <b className='fs-5'>{feature.name}  :</b>
                                                                {feature.value}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="back-sidebar pl-30 md-pl-0">
                                        <div className="widget back-post related__courses d-flex flex-column justify-content-center">
                                            <h3 className="widget-title">Phone no.</h3>
                                            {
                                                showNUmber && (
                                                    <h4 className='mb-0'>{listing.seller?.phone}</h4>
                                                )
                                            }
                                            {
                                                !showNUmber && (
                                                    <BTN
                                                        type={'button'}
                                                        onClick={() => { showNumber() }}
                                                        text={'Show Number'}
                                                        className={'btn btn-primary'}
                                                    />
                                                )
                                            }
                                        </div>
                                        <div className="widget back-post related__courses">
                                            <h3 className="widget-title">Condition</h3>
                                            <h5 className='mb-0'>{listing.condition}</h5>
                                        </div>
                                        <div className="widget back-post related__courses">
                                            <h3 className="widget-title">Price</h3>
                                            <div className="d-flex align-items-center gap-3">
                                                <h5 className='mb-0'>
                                                    <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                                                    {listing.price}
                                                </h5>
                                                {
                                                    listing.negotiable && (
                                                        <span className='status me-3 text-uppercase'>Negotiable</span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="widget back-post related__courses">
                                            <h3 className="widget-title">Seller Details</h3>
                                            <ul className="user-section d-flex flex-column gap-4 align-items-start pb-0">
                                                <li className="user d-flex gap-3 align-items-center pe-2">
                                                    <span>
                                                        <Link to={`/user/${listing.seller?.username}`}>
                                                            <Image
                                                                src={`${listing.sellerImg || defaultUser}`}
                                                                style={{ height: '80px', width: '80px' }}
                                                                alt="seller" />
                                                        </Link>
                                                    </span>
                                                    <span>
                                                        <Link to={`/user/${listing.seller?.username}`}>
                                                            <em className='fs-5 text-uppercase mb-1'> {listing.seller?.username}</em>
                                                            Member Since {sellerJoinDate.getFullYear()}
                                                        </Link>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default React.memo(SingleListing)