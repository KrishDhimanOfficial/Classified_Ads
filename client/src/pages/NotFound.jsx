import React from 'react'
import { Image } from '../components/component'
import { Link } from 'react-router-dom'
import errorImg from '../assets/images/error.png'

const NotFound = () => {
    return (
        <div class="back-wrapper">
            <div class="back-wrapper-inner">
                <div class="back-error-page pt-120 pb-120">
                    <div class="container text-center">
                        <Image src={errorImg} alt="error" />
                        <h1>Page Not Found!</h1>
                        <p>Please try searching for some other page.</p>
                        <Link to="/" class="back-btn"> Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound