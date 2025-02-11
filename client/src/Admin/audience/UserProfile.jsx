import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from '../../components/component'
import defaultUser from '../../assets/images/user.svg'
import { motion } from "motion/react"

const UserProfile = ({ image, name, username }) => {

    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.9 }}
            className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6">
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
                </div>
            </div>
        </motion.div>
    )
}

export default UserProfile