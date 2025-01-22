import React from 'react'
import { Image } from '../component'
import defaultuser from '../../assets/images/user.svg'

const Review_Rating = ({ image, name, review, date, rating }) => {
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
                            <i className="fa fa-star" style={{ color: rating >= 1 ? 'gold' : 'grey' }}></i>
                            <i className="fa fa-star" style={{ color: rating >= 2 ? 'gold' : 'grey' }}></i>
                            <i className="fa fa-star" style={{ color: rating >= 3 ? 'gold' : 'grey' }}></i>
                            <i className="fa fa-star" style={{ color: rating >= 4 ? 'gold' : 'grey' }}></i>
                            <i className="fa fa-star" style={{ color: rating >= 5 ? 'gold' : 'grey' }}></i>
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
