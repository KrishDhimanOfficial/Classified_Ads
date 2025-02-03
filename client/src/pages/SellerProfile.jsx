import React, { useEffect, useState } from 'react'
import { Image, SellerProfileListings, Review_container, ReviewForm, BTN } from '../components/component'
import DataService from '../hooks/DataService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import config from '../../config/config'
import defaultUser from '../assets/images/user.svg'
import { toast } from 'react-toastify'
import { GetCookie } from '../hooks/hooks'


const SellerProfile = () => {
    const navigate = useNavigate()
    const { seller_username } = useParams()
    const [listingLength, setLength] = useState(0)
    const [sellerInfo, setsellerInfo] = useState({})
    const [follwing, setfollowing] = useState(false)
    const [ShowFollowBtn, setShowFollowBtn] = useState(false)
    const date = new Date(sellerInfo.createdAt)

    const sellerDetails = async () => {
        try {
            const res = await DataService.get(`/get/seller-profile/${seller_username}`, {
                headers: {
                    Authorization: `Bearer ${GetCookie()}`
                }
            })
            if (res.error) navigate('/not-found')
            setLength(res.totalDocs)
            setsellerInfo(res.collectionData[0].seller)
        } catch (error) {
            console.error('sellerDetails : ' + error)
        }
    }

    const getSellerIdToNotShowFollowBtn = async () => {
        const token = sessionStorage.getItem('seller_token')
        if (!token) console.log('Token Not Found')
        const res = await DataService.get('/check-seller', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setShowFollowBtn(sellerInfo._id !== res.id)
    }

    const createFollowing = async () => {
        try {
            const token = sessionStorage.getItem('seller_token')
            if (!token) toast.warning('please login first!')
            await DataService.patch(`/follow/seller`, { followingId: sellerInfo._id, }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setfollowing(prev => !prev)
        } catch (error) {
            console.error(error)
        }
    }

    const createUnFollowing = async () => {
        try {
            const token = sessionStorage.getItem('seller_token')
            if (!token) toast.warning('please login first!')
            const res = await DataService.patch(`/unfollow/seller`, { followingId: sellerInfo._id, }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.message) sellerInfo.followers.length = 0, setfollowing(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => { getSellerIdToNotShowFollowBtn() }, [])
    useEffect(() => {
        sellerDetails()
        sellerInfo.followers?.includes(sellerInfo.followerId) ? setfollowing(true) : setfollowing(false)
    }, [follwing, sellerInfo.followers?.length])
    return (
        <>
            <title>{`seller - ${seller_username}`}</title>
            <div className="back-wrapper">
                <div className="back-wrapper-inner">
                    <div className='profile-top back__course__area back-courses__single-page pt-120 pb-90 md-pt-80 md-pb-50'>
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
                                        <li className="user d-flex flex-column">
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
                                                <i className="fa fa-star" style={{ color: sellerInfo.avg_rating >= 1 ? 'gold' : 'grey' }}></i>
                                                <i className="fa fa-star" style={{ color: sellerInfo.avg_rating >= 2 ? 'gold' : 'grey' }}></i>
                                                <i className="fa fa-star" style={{ color: sellerInfo.avg_rating >= 3 ? 'gold' : 'grey' }}></i>
                                                <i className="fa fa-star" style={{ color: sellerInfo.avg_rating >= 4 ? 'gold' : 'grey' }}></i>
                                                <i className="fa fa-star me-2" style={{ color: sellerInfo.avg_rating >= 5 ? 'gold' : 'grey' }}></i>
                                                {sellerInfo.avg_rating}
                                            </em>
                                        </li>
                                    </ul>
                                    <ul className='d-flex gap-3'>
                                        <li>
                                            <span className='fw-bold'>Followers : </span>
                                            <span className='fs-bold'> {sellerInfo.followersCount} </span>
                                        </li>
                                        <li>
                                            <span className='fw-bold'>Following : </span>
                                            <span className='fs-bold'> {sellerInfo.followingsCount} </span>
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
                                    <ul className='d-flex gap-3 mt-3'>
                                        {
                                            ShowFollowBtn && (
                                                <li>
                                                    <BTN
                                                        type={'button'}
                                                        text={follwing || sellerInfo.followers?.includes(sellerInfo.followerId)
                                                            ? 'Following'
                                                            : 'Follow'}
                                                        onClick={() => sellerInfo.followers?.includes(sellerInfo.followerId)
                                                            ? createUnFollowing()// That's follow the seller
                                                            : createFollowing() // That's Unfollow the seller
                                                        }
                                                        className={'back-btn'}
                                                    />
                                                </li>
                                            )
                                        }
                                    </ul>
                                    <div className="course-single-tab">
                                        <ul className="nav nav-tabs" id="back-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <Link to="#discription" className="nav-link active" id="discriptions" data-bs-toggle="tab" role="tab" aria-controls="discription" aria-selected="true">
                                                    All Listing
                                                </Link>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <Link to="#features" className="nav-link" id="featuress" data-bs-toggle="tab" role="tab" aria-controls="features" aria-selected="false">
                                                    Review & Rating
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="back-tab-content">
                                            <div className="tab-pane fade show active" id="discription" role="tabpanel" aria-labelledby="discription">
                                                <h3> All Listing </h3>
                                                <div className="row">
                                                    <SellerProfileListings />
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="features" role="tabpanel" aria-labelledby="features">
                                                <h3>Review & Rating</h3>
                                                <ReviewForm id={`${sellerInfo._id}`} /> {/* // This is the form to submit a review */}
                                                <div className="row">
                                                    <div className="col-12 my-3">
                                                        {sellerInfo._id && (<Review_container id={`${sellerInfo._id}`} />)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default React.memo(SellerProfile)