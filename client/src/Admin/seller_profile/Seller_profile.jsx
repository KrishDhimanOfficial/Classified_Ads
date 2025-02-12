import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import defaultuser from '../../assets/images/user.svg'
import config from '../../../config/config'
import { Image } from '../../components/component'

const Seller_profile = ({ totalListing }) => {
    const profile = useSelector(state => state.seller)
    const date = new Date(profile.seller.createdAt)

    return (
        <div className="profile-header d-flex flex-sm-row flex-column align-items-center">
            <Image
                src={profile.seller.image
                    ? `${config.seller_profile_img_path}/${profile.seller.image}`
                    : defaultuser
                }
                alt={"Profile picture of the user"}
                height={"80"} width={"80"}
            />
            <div className="ms-3 my-2 my-sm-0">
                <h5 className="mb-2 text-center text-sm-start">
                    {profile.seller.name}
                </h5>
                <div className='d-flex gap-3 mb-2 justify-content-center justify-content-sm-start'>
                    <h6 className='m-0'>
                        <Link to='/user/audience' className='text-dark'>Followers : {profile.seller?.followers?.length}</Link>
                    </h6>
                    <h6 className='m-0'>
                        <Link to='/user/audience' className='text-dark'>Followings : {profile.seller?.followings?.length}</Link>
                    </h6>
                </div>
                <p className="mb-0 text-center text-sm-start my-2 my-sm-0">
                    <span className="text-warning me-3">
                        {totalListing || 0} listing
                    </span>
                    Member since {date.getFullYear()}
                </p>
                <div className="d-flex align-items-center mt-2">
                    <p className='mb-0'>
                        <i className="fas fa-envelope me-2">
                        </i>
                        {profile.seller.email}
                    </p>
                    <p className='mb-0'>
                        <i className="fas fa-phone ms-4 me-2">
                        </i>
                        {profile.seller.phone}
                    </p>
                </div>
            </div>
            <div className="ms-auto">
                <Link to='/user/profile' className="btn btn-primary">
                    Edit Profile
                </Link>
            </div>
        </div>
    )
}

export default Seller_profile
