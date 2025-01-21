import React from 'react'
import { Input, BTN, TextArea } from '../component'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import DataService from '../../hooks/DataService'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Notify from '../../hooks/Notify'

const defaultValues = { name: '', email: '', review: '' }
const reviewSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    email: yup.string().trim()
        .email('Invalid email')
        .required('Email is required')
        .matches(/^[a-z0-9]+@gmail.com$/, 'Incorrect Email'),
    review: yup.string().trim()
        .required('Message is required')
        .max(200, 'Message is too long'),
})

const ReviewForm = ({ id }) => {
    const [rating, setRating] = React.useState(0)
    const { handleSubmit, reset, register, formState: { errors } } = useForm({
        defaultValues, resolver: yupResolver(reviewSchema)
    })

    const submitReview = async (formData) => {
        try {
            const token = sessionStorage.getItem('seller_token')
            if (!token) toast.error('Please login to write a review')
            const res = await DataService.post('/seller-reviews', { formData, rating, id })
            Notify(res), reset()
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="blog-form pt-30">
            <form onSubmit={handleSubmit(submitReview)} id="contact-form" autoComplete='off'>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="back-input">
                            <Input
                                {...register('name')}
                                id="name"
                                type="text"
                                className='mb-2'
                                placeholder="Name"
                                style={{
                                    border: errors.name?.message ? '1px solid red' : ''
                                }}
                            />
                            <p className='fs-6 text-danger m-0'>{errors.name?.message}</p>
                        </div>
                    </div>

                    <div className="col-lg-6 pdl-5">
                        <div className="back-input">
                            <Input
                                {...register('email')}
                                id="email"
                                type="email"
                                className='mb-2'
                                placeholder="Email"
                                style={{
                                    border: errors.email?.message ? '1px solid red' : ''
                                }}
                            />
                            <p className='fs-6 text-danger m-0'>{errors.email?.message}</p>
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="back-ratings" onClick={(e) => setRating(e.target.dataset.rating)} style={{ cursor: 'pointer' }}>
                            <b>Ratings:</b>
                            <i data-rating="1" className="fa-solid fa-star"></i>
                            <i data-rating="2" className="fa-solid fa-star"></i>
                            <i data-rating="3" className="fa-solid fa-star"></i>
                            <i data-rating="4" className="fa-solid fa-star"></i>
                            <i data-rating="5" className="fa-solid fa-star"></i>
                        </div>
                        <div className="back-textarea">
                            <TextArea
                                {...register('review')}
                                id="message"
                                placeholder="Message"
                                style={{
                                    border: errors.review?.message ? '1px solid red' : ''
                                }}
                            />
                            <p className='fs-6 text-danger m-0'>{errors.review?.message}</p>
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <BTN type="submit" text='Submit Review' className="back-btn" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default React.memo(ReviewForm)