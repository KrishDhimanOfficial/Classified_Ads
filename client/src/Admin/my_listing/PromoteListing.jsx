import React, { useEffect, useState } from 'react'
import { Input, BTN, Submit } from '../../components/component'
import { useNavigate, useParams } from 'react-router-dom'
import { DataService, GetCookie, Notify } from '../../hooks/hooks'
import { useForm } from 'react-hook-form'
import config from '../../../config/config'


const PromoteListing = () => {
    const navigate = useNavigate()
    const { listing_slug, id } = useParams()
    const [seller, setProfile] = useState({})
    const [plans, setPlans] = useState([])
    const [amount, setamount] = useState(0)
    const [planId, setplanId] = useState('')
    const [duration, setPlanDuration] = useState(0)

    const fetchPlans = async () => {
        try {
            const res = await DataService.get('/all/plans', {
                headers: {
                    Authorization: `Bearer ${GetCookie(navigate)}`
                }
            })
            setPlans(res)
        } catch (error) {
            console.error(error)
        }
    }

    const getProfile = async () => {
        const res = await DataService.post('/seller/profile', { token: GetCookie(navigate) }, {
            headers: {
                Authorization: `Bearer ${GetCookie(navigate)}`
            }
        })
        setProfile(res)
    }

    const featurethisAd = async (status) => {
        try {
            const res = await DataService.patch(`/promote-listing/${id}`, { status, planId, duration }, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
            await DataService.put('/update/seller-wallet', { amount, status }, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
            res.error ? Notify(res.error) : navigate('/user/my-listing')
            setamount(0), setplanId(''), setPlanDuration(0)
        } catch (error) {
            console.error('promoteListing : ', error)
        }
    }

    const handlepayment = () => {
        try {
            const options = {
                key: config.razorpay_key,
                amount: amount * 100,
                currency: 'INR',
                name: 'Classified Ads',
                description: 'Buy, Sell and Promote',
                handler: (response) => featurethisAd(true),
                prefill: {
                    name: seller.name,
                    email: seller.email,
                    contact: seller.phone,
                },
                theme: { color: "#000" }
            }
            const razorpayInstance = new window.Razorpay(options)
            razorpayInstance.open()
            razorpayInstance.on('payment.error', () => featurethisAd(false))
            razorpayInstance.on('payment.failed', () => featurethisAd(false))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => { fetchPlans(), getProfile() }, [])
    return (
        <>
            <title>Feature this Ad</title>
            <div className="container pt-120 pb-90">
                <div className="row g-3">
                    <div className="col-md-12">
                        <form onSubmit={(e) => { e.preventDefault(), handlepayment() }} className="plan-chooser w-100 mx-auto">
                            <div className="header">
                                <span className="title">Choose your plan</span>
                                <p className="desc">Amet minim mollit non deserunt ullamco est sit.</p>
                            </div>
                            {
                                plans.map((plan, i) => (
                                    <div className="plan-option" key={i} onClick={() => {
                                        plan.discount > 0
                                            ? setamount(plan.price - plan.price * plan.discount / 100)
                                            : setamount(plan.price)
                                            , setPlanDuration(plan.plan_duration), setplanId(plan._id)
                                    }}>
                                        <Input id={plan.title} name="plan" type="radio" />
                                        <label htmlFor={plan.title}>
                                            <div className="plan-info">
                                                <span className="plan-cost">
                                                    <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                                                    {plan.price}/{plan.title}
                                                </span>
                                                <span className="plan-name">{plan.title} plan</span>
                                            </div>
                                            {
                                                plan.discount > 0 && (
                                                    <span className="reduction"> {plan.discount}% OFF </span>
                                                )
                                            }
                                        </label>
                                    </div>
                                ))
                            }
                            <Submit
                                className="choose-btn border-0"
                                text='Start'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(PromoteListing)