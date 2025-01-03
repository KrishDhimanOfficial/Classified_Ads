import React from 'react'
import { Link } from 'react-router-dom'

const Seller_profile = () => {
    return (
        <div className="profile-header d-flex align-items-center">
            <img alt="Profile picture of the user" height="80" src="https://storage.googleapis.com/a1aa/image/pUW4uEdu8yLHBtc59eNJ0K4oItDZ39dbddkraIMiQc0P7sAKA.jpg" width="80" />
            <div className="ms-3">
                <h5 className="mb-0">
                    Test User
                    <span className="badge bg-success text-uppercase ms-3">
                        Verified
                    </span>
                    <span className="badge bg-purple text-uppercase">
                        Member
                    </span>
                </h5>
                <p className="mb-0">
                    <span className="text-warning me-3">
                        12 listing
                    </span>
                    Member since 2024
                </p>
                <div className="d-flex align-items-center mt-2">
                    <i className="fas fa-map-marker-alt me-2">
                    </i>
                    Dhaka, Bangladesh
                    <i className="fas fa-envelope ms-4 me-2">
                    </i>
                    test_user@gmail.com
                    <i className="fas fa-phone ms-4 me-2">
                    </i>
                    +8801799328264
                </div>
            </div>
            <div className="ms-auto">
                <Link to='/user/dashboard/profile' className="btn btn-primary">
                    Edit Profile
                </Link>
            </div>
        </div>
    )
}

export default Seller_profile
