import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from '../component'
import defaultUser from '../../assets/images/user.svg'

const Product = ({ title, category, image, slug, price, ad_status, sellerImg,sellerUsername }) => {
    return (
        <div className="course__item mb-30">
            <div className="course__thumb d-flex justify-content-center">
                <Link to={slug}>
                    <Image src={image} alt="image" style={{ height: '180px' }} />
                </Link>
            </div>
            <div className="course__inner px-4 pb-3">
                <div className="d-flex justify-content-between">
                    <span className="back-category cate-1"> {category} </span>
                    {/* <span className='text-black fw-light fs-6'>6 months ago</span> */}
                </div>
                <h3 className="back-course-title mb-2">
                    <Link to={slug}> {title} </Link>
                </h3>
                {/* <div className="course__card-icon d-flex">
                    <div className="back__user d-flex flex-column gap-2">
                        ${price}
                        {
                            ad_status && (
                                <div style={{ padding: '0.2rem 0.5rem' }}
                                    className={'btn btn-sm btn-primary'}>
                                    Featured
                                </div>
                            )
                        }
                    </div>
                </div> */}
                <div className="course__card-icon d-flex align-items-center">
                    <div className="course__card-icon--1">
                        {
                            ad_status && (
                                <div style={{ padding: '0.2rem 0.5rem' }}
                                    className={'btn btn-sm btn-primary'}>
                                    Featured
                                </div>
                            )
                        }
                    </div>
                    <div className="back__user">
                        ${price}
                        <Link to={`/user/${sellerUsername}`}>
                            <Image
                                src={sellerImg || defaultUser}
                                style={{ width: '40px', height: '40px' }}
                                alt="user"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
