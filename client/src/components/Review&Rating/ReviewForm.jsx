import React from 'react'
import { Input, BTN, TextArea } from '../component'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import DataService from '../../hooks/DataService'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Notify from '../../hooks/Notify'
import GetCookie from '../../hooks/GetCookie'
import { useNavigate } from 'react-router-dom'

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
            const res = await DataService.post('/seller-reviews', { formData, rating, id }, {
                headers: {
                    'Authorization': `Bearer ${GetCookie()}`
                }
            })
            if (res.error) toast.warning('Please Login First!')
            else Notify(res)
            reset()
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
                        <div id='rating' className="d-flex my-3" onClick={(e) => setRating(e.target.dataset.rating)} style={{ cursor: 'pointer' }}>
                            <b className='me-1'>Ratings:</b>
                            <ul className='ms-3 d-flex gap-2'>
                                <li>
                                    <i data-rating="1" style={{ color: rating >= 1 ? 'gold' : 'grey' }} className="fa-solid fa-star"></i>
                                </li>
                                <li>
                                    <i data-rating="2" style={{ color: rating >= 2 ? 'gold' : 'grey' }} className="fa-solid fa-star"></i>
                                </li>
                                <li>
                                    <i data-rating="3" style={{ color: rating >= 3 ? 'gold' : 'grey' }} className="fa-solid fa-star"></i>
                                </li>
                                <li>
                                    <i data-rating="4" style={{ color: rating >= 4 ? 'gold' : 'grey' }} className="fa-solid fa-star"></i>
                                </li>
                                <li>
                                    <i data-rating="5" style={{ color: rating >= 5 ? 'gold' : 'grey' }} className="fa-solid fa-star"></i>
                                </li>
                            </ul>
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