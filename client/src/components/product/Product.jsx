import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../../../public/assets/images/slide1.jpg'
import { Button } from '../component'

const Product = ({ title = 'helo', category = 'helo', image, price, ad_status }) => {
    return (
        <div className="course__item mb-30">
            <div className="course__thumb">
                <Link to="/">
                    <img src={Image} alt="image" />
                </Link>
            </div>
            <div className="course__inner px-4 pb-3">
                <div className="d-flex justify-content-between">
                    <span className="back-category cate-1"> {category} </span>
                    <span className='text-black fw-light fs-6'>6 months ago</span>
                </div>
                <h3 className="back-course-title mb-2">
                    <Link to="/"> {title} </Link>
                </h3>
                <div className="course__card-icon d-flex">
                    <div className="back__user d-flex flex-column gap-2">
                        ${price || 0}
                        {
                            ad_status && (
                                <div style={{ padding: '0.2rem 0.5rem' }}
                                    className={'btn btn-sm btn-primary'}>
                                    Featured
                                </div>
                            )
                        }
                    </div>
                    <div className="course__card-icon--1">
                        <div className="blog__card--icon-2-first">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <span>5</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
