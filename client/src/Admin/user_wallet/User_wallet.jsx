import React, { useCallback, useState } from 'react'
import { BTN, Input } from '../../components/component'
import config from '../../../config/config';
import { useSelector } from 'react-redux'
import DataService from '../../hooks/DataService';
import GetCookie from '../../hooks/GetCookie';
import { useNavigate } from 'react-router-dom';
import Notify from '../../hooks/Notify';
import { toast } from 'react-toastify';
import { Transactions } from '../admin'

const User_wallet = () => {
    const navigate = useNavigate()
    const profile = useSelector(state => state.seller)
    const [amount, setamount] = useState(0)


    const updateWallet = async (status) => {
        const res = await DataService.put('/update/seller-wallet', { amount, status },
            {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
        Notify(res)
    }

    const handlepayment = useCallback(() => {
        () => {
            try {
                const options = {
                    key: config.razorpay_key,
                    amount: amount * 100,
                    currency: 'USD',
                    name: 'Classified Ads',
                    description: 'Buy, Sell and Promote',
                    handler: (response) => updateWallet(true),
                    prefill: {
                        name: `${profile.seller.name}`,
                        email: `${profile.seller.email}`,
                        contact: `${profile.seller.phone}`,
                    },
                    theme: { color: "#000" }
                }
                const razorpayInstance = new window.Razorpay(options)
                razorpayInstance.open()
                razorpayInstance.on('payment.failed', () => updateWallet(false))
            } catch (error) {
                console.error(error)
            }
        }
    }, [])
    return (
        <>
            <div className="profile-header d-flex align-items-center justify-content-between">
                <div className='d-flex flex-column'>
                    <h6 className='text-grey fw-bold fs-5 mb-0'>Available Balance</h6>
                    <span className='text-primary fw-bolder fs-6'>${profile.seller.wallet_amount}</span>
                </div>
                <div className='d-flex gap-2 justify-content-end'>
                    <Input
                        type={'number'}
                        placeholder={'Amount'}
                        onChange={(e) => setamount(e.target.value)}
                        className={'form-control w-50'}
                    />
                    <BTN
                        type={'submit'}
                        text={'Add To Wallet'}
                        className={'btn btn-primary m-0 py-2'}
                        onClick={() => amount > 100 ? handlepayment() : toast.error('Amount should be greater than 100')}
                    />
                </div>
            </div>
            <Transactions />
        </>
    )
}

export default React.memo(User_wallet)