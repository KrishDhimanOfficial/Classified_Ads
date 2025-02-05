import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from '../../components/component'
import defaultUser from '../../assets/images/user.svg'

const UserProfile = ({ image, name, username }) => {

    return (
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6">
            <div className="instructor__content">
                <div className="instructor__content-1">
                    <Image
                        src={image || defaultUser}
                        className='d-flex mx-auto'
                        alt="course instructor picture"
                    />
                </div>
                <div className="instructor__content-2 text-center">
                    <h4>
                        <Link to={`/user/${username}`}>{name}</Link>
                    </h4>
                    {/* <p>Professor</p> */}
                </div>
                {
                    /* <div className="instructor__content-3">
                        <ul>
                            <li><a href="#"><span aria-hidden="true" className="social_facebook"></span></a></li>
                            <li><a href="#"><span aria-hidden="true" className="social_twitter"></span></a></li>
                            <li><a href="#"><span aria-hidden="true" className="social_linkedin"></span></a></li>
                        </ul>
                    </div> */
                }
            </div>
        </div>
    )
}

export default UserProfile