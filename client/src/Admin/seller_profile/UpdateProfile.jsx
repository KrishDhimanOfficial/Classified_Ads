import React, { useEffect, useState } from 'react'
import { Input, Image, BTN } from '../../components/component'
import defaultuser from '../../assets/images/user.svg'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import DataService from '../../hooks/DataService'
import Notify from '../../hooks/Notify'
import GetCookie from '../../hooks/GetCookie'
import { useNavigate } from 'react-router-dom'
import config from '../../../config/config'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const sellerPofileSchema = yup.object().shape({
    name: yup.string().trim().matches(/^[A-Za-z ]+$/, 'Invalid Name'),
    username: yup.string().trim().matches(/^[a-z0-9]+$/, 'Invalid username'),
    phone: yup.string().trim().max(10, 'Incorrect Phone no.')
        .matches(/^[0-9]+$/, 'Invalid phone'),
    email: yup.string().email().trim()
        .matches(/^[a-z0-9]+@gmail.com$/, 'Invalid email!'),
})


const UpdateProfile = () => {
    const navigate = useNavigate()
    const [profileImg, setImg] = useState('#')
    const profile = useSelector(state => state.seller)
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(sellerPofileSchema)
    })

    const displayPreviewImage = async (e) => {
        const file = e.target.files[0]
        setImg(URL.createObjectURL(file))
    }

    const handleupdateSellerProfile = async (data) => {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => formData.append(key, value))

        const res = await DataService.put(`/seller/profile/${profile.seller._id}`, formData, {
            headers: {
                'Authorization': `Bearer ${GetCookie(navigate)}`
            }
        })
        if (res.error) navigate('/login')
        Notify(res)
    }

    useEffect(() => {
        if (profile.seller) {
            setImg(profile.seller.image
                ? `${config.seller_profile_img_path}/${profile.seller.image}`
                : defaultuser)
            setValue('username', profile.seller.username)
            setValue('name', profile.seller.name)
            setValue('email', profile.seller.email)
            setValue('phone', profile.seller.phone)
        }
    }, [profile])
    return (
        <>
            <title>profile</title>
            <div className="back-login-page">
                <div className="login-right-form pt-0">
                    <form onSubmit={handleSubmit(handleupdateSellerProfile)} autoComplete='off' encType="multipart/form-data">
                        <div className="profile-photo">
                            <Image
                                src={`${profileImg}`}
                                alt={"Profile photo of a seller"}
                                height={"100"} width={"100"}
                            />
                        </div>
                        <div className="upload-btn mb-4">
                            <Input
                                type={'file'}
                                id={'profileimg'}
                                accept={"image/*"}
                                {...register('image')}
                                onChange={(e) => {
                                    displayPreviewImage(e)
                                    register('image').onChange(e)
                                }}
                                hidden
                            />
                            <label htmlFor="profileimg"
                                className='btn btn-light'>
                                <i className="fas fa-upload me-2"></i>
                                Upload Photo
                            </label>
                        </div>
                        <div className="d-flex gap-3 w-100">
                            <p className='w-100'>
                                <label>Username</label>
                                <Input
                                    type={'text'}
                                    style={{ border: errors.username?.message ? '1px solid red' : '' }}
                                    {...register('username')}
                                />
                                <span className='fs-6 text-danger m-0'>{errors.username?.message}</span>
                            </p>
                            <p className='w-100'>
                                <label>Name</label>
                                <Input
                                    type={'text'}
                                    style={{ border: errors.name?.message ? '1px solid red' : '' }}
                                    {...register('name')}
                                />
                                <span className='fs-6 text-danger m-0'>{errors.name?.message}</span>
                            </p>
                        </div>
                        <div className="d-flex gap-3 w-100">
                            <p className='w-100'>
                                <label>Email</label>
                                <Input
                                    type={'email'}
                                    style={{ border: errors.email?.message ? '1px solid red' : '' }}
                                    {...register('email')}
                                />
                                <span className='fs-6 text-danger m-0'>{errors.email?.message}</span>
                            </p>
                            <p className='w-100'>
                                <label>Phone no.</label>
                                <Input
                                    type={'phone'}
                                    style={{ border: errors.phone?.message ? '1px solid red' : '' }}
                                    {...register('phone')}
                                />
                                <span className='fs-6 text-danger m-0'>{errors.phone?.message}</span>
                            </p>
                        </div>
                        <BTN
                            disabled={isSubmitting}
                            type={"submit"}
                            className={'w-25'}
                            text={isSubmitting ? 'uploading...' : 'upload'}
                            id={"button"}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile