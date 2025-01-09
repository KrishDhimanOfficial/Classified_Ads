import React from 'react'
import defaultuser from '../../assets/images/user.svg'

function Review_Rating() {
    return (
        <div className="review-item">
            <img alt="Profile picture of the reviewer" height="50" src={defaultuser} width="50" />
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
                            Test Two
                        </strong>
                    </div>
                    <div className="review-date">
                        27, Apr, 2024
                    </div>
                </div>
                <p className='text-start'>
                    Cameron sold me a laptop which was this much awesome that I couldn’t express my gratitude.
                </p>
            </div>
        </div>
    )
}

export default React.memo(Review_Rating)
