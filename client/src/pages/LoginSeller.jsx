import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Submit } from '../components/component'

const LoginSeller = () => {
    return (
        <>
            <title>Login</title>
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <form className="form" style={{ width: '100%' }}>
                    <p className="form-title">Login</p>

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
                        text={'Login'}
                        classs={'submit'}
                    />
                    <p className="signup-link mt-3">
                        No Account?
                        <Link to="/register" className='ms-3'>Create Account</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default LoginSeller
