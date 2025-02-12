import React, { useState } from 'react'
import { Change_password } from '../admin'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { Account_setting } from '../admin'
const Setting = () => {
    const [show, setShow] = useState(false)
    const handleDeleteAccount = () => {
        console.log('delete account')
    }
    return (
        <div className="row my-4">
            <div className="col-12">
                <div className="card w-100">
                    <div className="card-body">
                        <h5 className="card-title">
                            All Settings
                        </h5>
                        <Tabs
                            defaultActiveKey="password"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="password" title="Change Password">
                                <Change_password />
                            </Tab>
                            <Tab eventKey="account" title="Account Settings">
                                <Account_setting />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting
