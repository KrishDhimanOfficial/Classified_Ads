import React, { useEffect, useState } from 'react'
import { Review_Rating } from '../component'
import { Link } from 'react-router-dom'
import DataService from '../../hooks/DataService';

const Review_container = ({ id }) => {
    const [reviews, setReviews] = useState({})


    const fetchReviews = async (page) => {
        try {
            const res = await DataService.get(`/seller-reviews/${id}?page=${page}`)
            setReviews(res)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => { fetchReviews() }, [id])
    return (
        <>
            {
                reviews.collectionData?.map((review, i) => (
                    <Review_Rating
                        key={i}
                        rating={review.rating}
                        name={review.name}
                        review={review.review}
                        date={review.created_At}
                        image={review.sellerImg}
                    />
                ))
            }
            <div className="d-flex justify-content-center mt-5">
                <ul className="back-pagination">
                    {
                        reviews.prevpage && (
                            <li className="back-next">
                                <Link to="#" onClick={(e) => {
                                    e.preventDefault()
                                    fetchReviews(reviews.page - 1)
                                }}> Previous </Link>
                            </li>
                        )}
                    {
                        reviews?.totalDocs > reviews?.limit && (
                            Array.from({ length: reviews.totalPages })?.map((_, i) => (
                                <li key={i}>
                                    <Link to="#"
                                        className={reviews.page === i + 1 ? 'bg-primary text-white' : ''}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            fetchReviews(i + 1)
                                        }}>{i + 1} </Link>
                                </li>
                            ))
                        )
                    }
                    {
                        reviews.nextpage && (
                            <li className="back-next p-0">
                                <Link to="#" onClick={(e) => {
                                    e.preventDefault()
                                    fetchReviews(reviews.page + 1)
                                }}> Next </Link>
                            </li>
                        )}
                </ul>
            </div>
        </>
    )
}

export default Review_container