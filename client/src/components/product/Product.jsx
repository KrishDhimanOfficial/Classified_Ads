import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BTN, Image } from '../component'
import defaultUser from '../../assets/images/user.svg'
import DataService from '../../hooks/DataService'
import { GetCookie } from '../../hooks/hooks'
import { setWishListVisible } from '../../../controller/seller.store'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const Product = ({ id, title, category, image, slug, wishlist, price,
    ad_status, sellerImg, sellerUsername, location }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [fillheart, setfillheart] = useState(false)
    const [loading, setloading] = useState(false)

    const updateClickCount = async () => {
        try {
            const token = sessionStorage.getItem('seller_token')
            await DataService.patch(`/update-ad-click/${id}`, { token })
        } catch (error) {
            console.error('updateClickCount : ', error)
        }
    }

    const addtoWishlist = async () => {
        try {
            setfillheart(true)
            const token = sessionStorage.getItem('seller_token')
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
    const removeWishlist = async (e) => {
        try {
            setloading(true)
            const token = sessionStorage.getItem('seller_token')
            const res = await DataService.patch(`/delete-wishlist-item/${id}`, { token }, {
                headers: {
                    Authorization: `Bearer ${GetCookie(navigate)}`
                }
            })
            if (res.message) setloading(false), dispatch(setWishListVisible(true))
        } catch (error) {
            setloading(false)
            console.error('removeWishlist : ' + error)
        }
    }
    return (
        <div className="course__item mb-30">
            <div className="course__thumb d-flex justify-content-center">
                <Link to={slug} onClick={() => ad_status ? updateClickCount() : null} >
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
                        <i className={`${wishlist || fillheart ? 'fa-solid' : 'fa-regular'} fa-heart`}
                            onClick={() => { addtoWishlist() }}
                            style={{ cursor: 'pointer' }}>
                        </i>
                    </div>
                </div>
                <h3 className="back-course-title mb-2">
                    <Link
                        to={slug}
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
                        <Link to={`/user/${sellerUsername}`}>
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
                {
                    wishlist && (<div className="course__card-icon--2">
                        <BTN
                            type={'button'}
                            onClick={(e) => removeWishlist(e)}
                            className={'btn btn-sm btn-danger'}
                            icon={loading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}
                            text={loading ? 'Loading...' : 'Remove'}
                            style={{ padding: '0.2rem 0.5rem' }}
                            disabled={loading}
                        />
                    </div>)
                }
            </div>
        </div>
    )
}

export default Product
