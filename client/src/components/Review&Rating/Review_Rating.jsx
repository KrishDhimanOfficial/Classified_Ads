import React from 'react'
import { Image } from '../component'
import defaultuser from '../../assets/images/user.svg'

const Review_Rating = ({ image, name, review, date }) => {
    const createdDate = new Date(date)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return (
        <div className="review-item">
            <Image
                alt="Profile picture of the reviewer"
                height="50" src={image || defaultuser} width="50" />
            <div className="review-content">
                <div className="d-flex justify-content-between">
                    <div className='d-flex flex-column'>
                        <div className="review-stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <strong className='text-start'>
                            {name}
                        </strong>
                    </div>
                    <div className="review-date">
                        {monthNames[createdDate.getMonth()]} {createdDate.getDate()},  {createdDate.getFullYear()}
                    </div>
                </div>
                <p className='text-start'>
                    {review}
                </p>
            </div>
        </div>
    )
}

export default React.memo(Review_Rating)
