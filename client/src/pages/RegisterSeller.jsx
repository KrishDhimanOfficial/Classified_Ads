import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Submit } from '../components/component'

const RegisterSeller = () => {
    return (
        <>
            <title>Register</title>
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <form className="form" style={{ width: '100%' }}>
                    <p className="form-title">Register</p>

                    <div className="input-container w-100">
                        <Input
                            type='email'
                            classs='w-100'
                            placeholder='Enter Email'
                        />
                    </div>
                    <div className="input-container">
                        <Input
                            type={"password"}
                            placeholder={"Enter password"}
                            classs={'w-100'}
                        />
                    </div>
                    <Submit
                        text={'Create Account'}
                        classs={'submit'}
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
