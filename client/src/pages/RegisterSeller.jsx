import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Input, Submit } from '../components/component'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer } from 'react-toastify'
import { DataService, Notify } from '../hooks/hooks'
import * as  yup from 'yup'

const defaultValues = { name: '', username: '', phone: '', email: '', password: '' }

const schema = yup.object().shape({
    name: yup.string().trim()
        .required('Name is Required')
        .matches(/^[A-Za-z ]+$/, 'Invalid Name'),
    username: yup.string().trim()
        .required('Username is required')
        .matches(/^[a-z0-9]+$/, 'Invalid username'),
    phone: yup.string().trim()
        .max(10, 'Incorrect Phone no.')
        .required('Phone is required')
        .matches(/^[0-9]+$/, 'Invalid phone'),
    email: yup.string().email().trim()
        .matches(/^[a-z0-9]+@gmail.com$/, 'Invalid email!'),
    password: yup.string().trim()
        .required('Password is required')
})

const RegisterSeller = () => {
    const { handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm(
        {
            resolver: yupResolver(schema),
            defaultValues
        }
    ) // Handling Form Data
    const handleForm = async (fromData) => {
        try {
            const res = await DataService.post('/register/seller', fromData)
            if (res.message) reset()
            Notify(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <title>Register</title>
            <ToastContainer />
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <form onSubmit={handleSubmit(handleForm)} className="form" autoComplete='off' style={{ width: '100%' }}>
                    <p className="form-title">Register</p>
                    <div className="d-flex gap-3">
                        <div className="input-container w-100">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => <Input
                                    type={'text'}
                                    placeholder={'Name'}
                                    style={{
                                        border: errors.name?.message ? '1px solid red' : ''
                                    }}
                                    {...field}
                                />}
                            />
                            <p className='fs-6 text-danger m-0'>{errors.name?.message}</p>
                        </div>
                        <div className="input-container w-100">
                            <Controller
                                name='username'
                                control={control}
                                render={({ field }) => <Input
                                    type={'text'}
                                    placeholder={'Username'}
                                    style={{
                                        border: errors.username?.message ? '1px solid red' : ''
                                    }}
                                    {...field}
                                />}
                            />
                            <p className='fs-6 text-danger m-0'>{errors.username?.message}</p>
                        </div>
                    </div>
                    <div className="input-container w-100">
                        <Controller
                            name='phone'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <Input
                                type={'phone'}
                                placeholder={'Enter phone no.'}
                                style={{
                                    border: errors.phone?.message ? '1px solid red' : ''
                                }}
                                {...field}
                            />}
                        />
                        <p className='fs-6 text-danger m-0'>{errors.phone?.message}</p>
                    </div>
                    <div className="input-container w-100">
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
                        text={isSubmitting ? '...Submitting' : 'Create Account'}
                        className={'submit'}
                        disabled={isSubmitting}
                    />
                    <p className="signup-link mt-3">
                        Have Account?
                        <Link to="/login" className='ms-3'>Login</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default RegisterSeller