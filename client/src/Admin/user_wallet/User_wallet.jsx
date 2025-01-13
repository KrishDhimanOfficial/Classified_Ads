import React, { useState } from 'react'
import { Button, Input } from '../../components/component'
import config from '../../../config/config';
import { useSelector } from 'react-redux'
import DataService from '../../hooks/DataService';
import GetCookie from '../../hooks/GetCookie';
import { useNavigate } from 'react-router-dom';
import Notify from '../../hooks/Notify';

const User_wallet = () => {
    const navigate = useNavigate()
    const profile = useSelector(state => state.seller)
    const [amount, setamount] = useState(0)

    const updateWallet = async (response) => {
        const res = await DataService.put('/update/seller-wallet',
            { amount },
            {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
        Notify(res)
    }

    const handlepayment = async () => {
        try {
            const options = {
                key: config.razorpay_key,  // Replace with your Razorpay Key ID
                amount: amount * 100, // Amount in paise (50000 paise = INR 500)
                currency: "INR",
                name: "Your Company Name",
                description: "Test Transaction",
                handler: (response) => updateWallet(response),
                prefill: {
                    name: `${profile.seller.name}`,
                    email: `${profile.seller.email}`,
                    contact: `${profile.seller.phone}`,
                },
                theme: { color: "#F37254" }
            }
            const razorpayInstance = new window.Razorpay(options)
            razorpayInstance.open()
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="profile-header d-flex align-items-center justify-content-between">
            <div className='d-flex flex-column'>
                <h6 className='text-grey fw-bold fs-5 mb-0'>Available Balance</h6>
                <span className='text-primary fw-bolder fs-6'>$1223</span>
            </div>
            <div className='d-flex gap-2 justify-content-end'>
                <Input
                    type={'number'}
                    onChange={(e) => setamount(e.target.value)}
                    className={'form-control w-50'}
                />
                <Button
                    type={'submit'}
                    text={'Add To Wallet'}
                    className={'btn btn-primary m-0 py-2'}
                    onClick={() => handlepayment()}
                />
            </div>
        </div>
    )
}

export default User_wallet