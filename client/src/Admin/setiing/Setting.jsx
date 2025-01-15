import React from 'react'
import { BTN } from '../../components/component'
import { Change_password } from '../admin'
const Setting = () => {
    return (
        <div className="row my-4">
            <div className="col-12">
                <div className="card w-100">
                    <div className="card-body">
                        <h5 className="card-title">
                            All Settings
                        </h5>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <BTN
                                    text={'Change Password'}
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
                                    text={'Account Setting'}
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
                                <Change_password />
                            </div>
                            <div aria-labelledby="given-tab" className="tab-pane fade" id="given" role="tabpanel">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting
