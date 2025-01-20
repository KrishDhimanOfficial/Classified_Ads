import React, { useEffect, useState } from 'react'
import { Image, Product, SellerProfileListings } from '../components/component'
import DataService from '../hooks/DataService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import config from '../../config/config'
import defaultUser from '../assets/images/user.svg'

const SellerProfile = () => {
    const navigate = useNavigate()
    const { seller_username } = useParams()
    const [listingLength, setLength] = useState(0)
    const [sellerInfo, setsellerInfo] = useState({})

    const date = new Date(sellerInfo.createdAt)

    const sellerDetails = async () => {
        try {
            const res = await DataService.get(`/get/seller-profile/${seller_username}`)
            if (res.error) navigate('not-found')
            setLength(res.totalDocs)
            setsellerInfo(res.collectionData[0].seller)
        } catch (error) {
            console.error('sellerDetails : ' + error)
        }
    }
    useEffect(() => { sellerDetails() }, [])
    return (
        <>
            <title>{`profile - ${seller_username}`}</title>
            <div className="back-wrapper">
                <div className="back-wrapper-inner">
                    <div className='profile-top back__course__area pt-120 pb-90 md-pt-80 md-pb-50'>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <Image
                                        src={sellerInfo.image
                                            ? `${config.seller_profile_img_path}/${sellerInfo.image}`
                                            : defaultUser
                                        }
                                        alt='profile'
                                    />
                                </div>
                                <div className="col-md-8 pl-50 md-pl-15 md-mt-60">
                                    <ul className="user-section border-bottom-0 mb-0">
                                        <li className="user">
                                            <span className="name">
                                                {sellerInfo.name}
                                            </span>
                                            <em>
                                                {listingLength} Listing
                                                <span className='ms-3'>Member since {date.getFullYear()}</span>
                                            </em>
                                        </li>
                                        <li>Review:
                                            <em className="back-ratings">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                4.5
                                            </em>
                                        </li>
                                        <li>
                                            <Link to="#" className="follow">Rate this Seller <i className="icon_plus"></i></Link>
                                        </li>
                                    </ul>
                                    <ul className='d-flex gap-3'>
                                        <li>
                                            <span className='fw-bold'>Email : </span>  <em>{sellerInfo.email}</em>
                                        </li>
                                        <li>
                                            <span className='fw-bold'>Phone : </span>  <em>{sellerInfo.phone}</em>
                                        </li>
                                    </ul>
                                    <h2 className="teacher__course">All Listing</h2>
                                    <div className="row">
                                        <SellerProfileListings />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellerProfile