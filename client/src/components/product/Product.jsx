import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BTN, Image } from '../component'
import defaultUser from '../../assets/images/user.svg'
import DataService from '../../hooks/DataService'
import { GetCookie } from '../../hooks/hooks'
import { setWishListVisible } from '../../../controller/seller.store'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'

const Product = ({ id, title, category, image, slug, price, isfavourite, date, ad_end_date,
    ad_status, sellerImg, sellerUsername, location }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [fillheart, setfillheart] = useState(isfavourite)

    const current_date = new Date(date).getDate()
    const end_date = new Date(ad_end_date).getDate()
    const current_month = new Date(date).getMonth() + 1;
    const end_month = new Date(ad_end_date).getMonth() + 1;

    const updateClickCount = async () => {
        try {
            const token = localStorage.getItem('seller_token')
            await DataService.patch(`/update-ad-click/${id}`, { token })
        } catch (error) {
            console.error('updateClickCount : ', error)
        }
    }

    const addtoWishlist = async () => {
        try {
            setfillheart(true)
            const token = localStorage.getItem('seller_token')
            const res = await DataService.patch('/add-to-wishlist', { id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.error) setfillheart(false), toast.warning('Please Login First!')
        } catch (error) {
            console.log(error)
        }
    }
    const removeWishlist = async () => {
        try {
            setfillheart(false)
            const token = localStorage.getItem('seller_token')
            const res = await DataService.patch(`/delete-wishlist-item/${id}`, { token }, {
                headers: {
                    Authorization: `Bearer ${GetCookie(navigate)}`
                }
            })
            if (res.message) dispatch(setWishListVisible(true))
        } catch (error) {
            console.error('removeWishlist : ' + error)
        }
    }

    const UpdateAdStatus = async (ad_status) => {
        await DataService.patch(`/unfeature/ad/${id}`, { ad_status })
    }
    useEffect(() => {
        if (current_date > end_date || (current_date > end_date && current_month > end_month)) UpdateAdStatus(false)
    }, [])
    return (
        <div className="course__item mb-30">
            <div className="course__thumb d-flex justify-content-center">
                <Link to={slug} target='_blank' onClick={() => ad_status ? updateClickCount() : null} >
                    <Image
                        src={image}
                        alt="image"
                        style={{ height: '180px' }}
                    />
                </Link>
            </div>
            <div className="course__inner px-4 pb-3">
                <div className="d-flex justify-content-between">
                    <span className="back-category cate-1"> {category} </span>
                    <div className="course__card-icon--2">
                        <OverlayTrigger
                            key='right'
                            placement='top'
                            overlay={
                                <Tooltip id='tooltip-top'>
                                    <strong>{fillheart ? 'Remove From WishList' : 'Add To WishList'}</strong>.
                                </Tooltip>
                            }
                        >
                            <i className={`${fillheart ? 'fa-solid' : 'fa-regular'} fa-heart`}
                                onClick={() => { fillheart ? removeWishlist() : addtoWishlist() }}
                                style={{ cursor: 'pointer' }}>
                            </i>
                        </OverlayTrigger>
                    </div>
                </div>
                <h3 className="back-course-title mb-2">
                    <Link
                        to={slug}
                        target='_blank'
                        onClick={() => ad_status ? updateClickCount() : null}>
                        {title}
                    </Link>
                </h3>
                <div className="course__card-icon d-flex align-items-center">
                    <div className="course__card-icon--1">
                        {
                            ad_status && (
                                <div style={{ padding: '0.2rem 0.5rem' }}
                                    className={'btn btn-sm btn-primary'}>
                                    Featured
                                </div>
                            )
                        }
                    </div>

                    <div className="back__user">
                        <i className="fa-solid fa-indian-rupee-sign"></i>
                        {price}
                        <Link to={`/user/${sellerUsername}`} target='_blank'>
                            <Image
                                src={sellerImg || defaultUser}
                                style={{ width: '40px', height: '40px' }}
                                alt="user"
                            />
                        </Link>
                    </div>
                </div>
                <div className="course__card-icon d-flex align-items-center">
                    {
                        location && (
                            <div className="course__card-icon--1">
                                <i className="fa-solid fa-location-dot"></i>
                                <span className='fs-6'>{location}</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Product