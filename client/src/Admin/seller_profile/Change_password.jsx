import React from 'react'
import { Input, BTN } from '../../components/component'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import DataService from '../../hooks/DataService'
import Notify from '../../hooks/Notify'
import GetCookie from '../../hooks/GetCookie'
import { useNavigate } from 'react-router-dom'

const Change_password = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()

    const changePassword = async (formdata) => {
        if (formdata.new_password != formdata.re_enter_password) {
            toast.error('password must be same!')
        } else {
            const res = await DataService.put('/change/password', formdata, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
            Notify(res)
        }
    }

    return (
        <div className="back-login-page">
            <div className="login-right-form pt-0">
                <form onSubmit={handleSubmit(changePassword)} autoComplete='off' encType="multipart/form-data">
                    <div className="d-flex gap-3 w-100">
                        <p className='w-100'>
                            <label>Current password</label>
                            <Input
                                type={'password'}
                                {...register('current_password')}
                            />
                        </p>
                        <p className='w-100'>
                            <label>New Password</label>
                            <Input
                                type={'password'}
                                {...register('new_password')}
                            />
                        </p>
                        <p className='w-100'>
                            <label>Re - Enter Password</label>
                            <Input
                                type={'password'}
                                {...register('re_enter_password')}
                            />
                        </p>
                    </div>
                    <div className={'w-50 float-end'}>
                        <BTN
                            disabled={isSubmitting}
                            type={"submit"}
                            text={isSubmitting ? 'Loading...' : 'Change password'}
                            id={"button"}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default React.memo(Change_password)