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
        <div className="profile-header d-flex align-items-center">
            <Image
                src={profile.seller.image
                    ? `${config.seller_profile_img_path}/${profile.seller.image}`
                    : defaultuser
                }
                alt={"Profile picture of the user"}
                height={"80"} width={"80"}
            />
            <div className="ms-3">
                <h5 className="mb-0">
                    {profile.seller.name}
                    <span className="badge bg-purple text-uppercase">
                        Member
                    </span>
                </h5>
                <p className="mb-0">
                    <span className="text-warning me-3">
                        {totalListing} listing
                    </span>
                    Member since {date.getFullYear()}
                </p>
                <div className="d-flex align-items-center mt-2">
                    <p className='mb-0'>
                        <i className="fas fa-envelope ms-4 me-2">
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
