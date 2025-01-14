import { Link, useNavigate } from 'react-router-dom'
import { Input, Submit } from '../components/component'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer } from 'react-toastify'
import { Notify } from '../hooks/hooks'
import * as yup from 'yup'
import { DataService } from '../hooks/hooks'

const defaultValues = { email: '', password: '' }

const validateData = yup.object().shape({
    email: yup.string().email().trim()
        .required('Email is required')
        .matches(/^[a-z0-9]+@gmail.com$/, 'Incorrect Email'),
    password: yup.string().trim()
        .required('password is required')
})

const LoginSeller = () => {
    const navigate = useNavigate()
    const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        defaultValues,
        resolver: yupResolver(validateData),
    })
    const handleLogin = async (fromData) => {
        try {
            const res = await DataService.post('/login/seller', fromData)
            Notify(res)
            const date = new Date()
            const expDate = date.setTime(date.getTime() + (24 * 60 * 60 * 1000))
            document.cookie = `seller_token=${res.seller_token};expires=${expDate};path=/`;
            if (res.message) navigate('/user/dashboard')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <title>Login</title>
            <ToastContainer />
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <form onSubmit={handleSubmit(handleLogin)} autoComplete='off' className="form" style={{ width: '100%' }}>
                    <p className="form-title">Login</p>
                    <div className="input-container">
                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <Input
                                type={'email'}
                                placeholder={'Enter Email'}
                                style={{
                                    border: errors.email?.message ? '1px solid red' : ''
                                }}
                                {...field}
                            />}
                        />
                        <p className='fs-6 text-danger m-0'>{errors.email?.message}</p>
                    </div>
                    <div className="input-container">
                        <Controller
                            name='password'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <Input
                                type={"password"}
                                placeholder={"Enter password"}
                                style={{
                                    border: errors.password?.message ? '1px solid red' : ''
                                }}
                                {...field}
                            />}
                        />
                        <p className='fs-6 text-danger m-0'>{errors.password?.message}</p>
                    </div>
                    <Submit
                        text={isSubmitting ? '...Loging' : 'Login'}
                        className={'submit'}
                        disabled={isSubmitting}
                    />
                    <p className="signup-link mt-3">
                        No Account?
                        <Link to="/register" className='ms-3'>
                            Create Account
                        </Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default LoginSeller