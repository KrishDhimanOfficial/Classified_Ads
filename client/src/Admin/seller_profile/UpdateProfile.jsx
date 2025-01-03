import React from 'react'
import { Button } from '../../components/component'

const UpdateProfile = () => {
    return (
        <>
            <div className="profile-photo">
                <img alt="Profile photo of a person" height="100" src="https://storage.googleapis.com/a1aa/image/zngCN1eWu0RhM6ChtFjemxMeweeuR87ikV371AqP0VO3VVLgC.jpg" width="100" />
            </div>
            <div className="upload-btn">
                <Button
                    type={'button'}
                    icon={<i className="fas fa-upload"></i>}
                    text={'Upload Photo'}
                    className={"btn btn-light"}
                />
            </div>
            <form>
                <div className="mb-3">
                    <label className="form-label" htmlFor="firstName">
                        First Name
                        <span className="text-danger">
                            *
                        </span>
                    </label>
                    <input className="form-control" id="firstName" type="text" />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="lastName">
                        Last Name
                        <span className="text-danger">
                            *
                        </span>
                    </label>
                    <input className="form-control" id="lastName" type="text" />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                        Your Email
                        <span className="text-danger">
                            *
                        </span>
                    </label>
                    <input className="form-control" id="email" type="email" />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="phone">
                        Your Phone
                        <span className="text-danger">
                            *
                        </span>
                    </label>
                    <input className="form-control" id="phone" type="text" />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="country">
                        Select Your Country
                        <span className="text-danger">
                            *
                        </span>
                    </label>
                    <input className="form-control" id="country" type="text" />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label" htmlFor="state">
                            Select Your State
                            <span className="text-danger">
                                *
                            </span>
                        </label>
                        <select className="form-select" id="state">
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label" htmlFor="city">
                            Select Your City
                        </label>
                        <select className="form-select" id="city">
                        </select>
                    </div>
                </div>
                <div className="d-grid">
                    <button className="btn btn-primary" type="submit">
                        Save changes
                    </button>
                </div>
            </form>
        </>

    )
}

export default UpdateProfile
