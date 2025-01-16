import React, { useEffect, useState } from 'react'
import { BTN } from '../../components/component'
import { Review_Rating, Seller_profile } from '../admin'
import DataService from '../../hooks/DataService'
import GetCookie from '../../hooks/GetCookie'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const [listing, setlisting] = useState({ totalActive: 0, totalDeActive: 0 })

    const fetchListings = async () => {
        const res = await DataService.post('/listings', {}, {
            headers: {
                'Authorization': `Bearer ${GetCookie(navigate)}`
            }
        })
        setlisting(res[0])
    }
    useEffect(() => {
        fetchListings()
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Seller_profile />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="profile-stats">
                        <div className="stat stat-orange">
                            <h4>
                                {listing?.totalActive + listing?.totalDeActive || 0}
                            </h4>
                            <p>
                                All Listing
                            </p>
                        </div>
                        <div className="stat stat-green">
                            <h4>
                                {listing?.totalActive || 0}
                            </h4>
                            <p>
                                Active Listing
                            </p>
                        </div>
                        <div className="stat stat-red">
                            <h4>
                                {listing?.totalDeActive || 0}
                            </h4>
                            <p>
                                Deactive Listing
                            </p>
                        </div>
                        <div className="stat stat-blue">
                            <h4>
                                0
                            </h4>
                            <p>
                                Favorite Ads
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-12">
                    <div className="card w-100">
                        <div className="card-body">
                            <h5 className="card-title">
                                All Reviews
                            </h5>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <BTN
                                        text={'Reviews Received'}
                                        aria-controls={"received"}
                                        aria-selected={"true"}
                                        className={"nav-link active"}
                                        data-bs-target={"#received"}
                                        data-bs-toggle={"tab"}
                                        id={"received-tab"}
                                        role={"tab"}
                                        type={"button"}
                                    />
                                </li>
                                <li className="nav-item" role="presentation">
                                    <BTN
                                        role={"tab"} type={"button"}
                                        text={'Reviews Given'}
                                        aria-controls={"given"}
                                        aria-selected={"false"}
                                        className={"nav-link"}
                                        data-bs-target={"#given"}
                                        data-bs-toggle={"tab"}
                                        id={"given-tab"}
                                    />
                                </li>
                            </ul>
                            <div className="tab-content mt-3" id="myTabContent">
                                <div aria-labelledby="received-tab" className="tab-pane fade show active" id="received" role="tabpanel">
                                    <Review_Rating />
                                </div>
                                <div aria-labelledby="given-tab" className="tab-pane fade" id="given" role="tabpanel">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard