import React, { useEffect, useState } from 'react'
import { DataService, GetCookie, Notify } from '../../hooks/hooks'
import { UserProfile } from '../admin'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from 'react-router-dom';
import { useActionState } from 'react';

const Audience = () => {
    const navigate = useNavigate()
    const [data, setdata] = useState({})
    const [isloading, setloading] = useState(false)
    
    const fetch = async () => {
        try {
            setloading(true)
            const res = await DataService.get(`/user/following-followers`, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
            setloading(false), Notify(res), setdata(res)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => { fetch() }, [])
    return (
        <div className="row my-4">
            <div className="col-12">
                <div className="course-single-tab">
                    <Tabs defaultActiveKey="Followers" id="uncontrolled-tab-example" className="mb-3">
                        <Tab className='instructor__area ' eventKey="Followers" title="Followers">
                            <div className='row instructor__width bg-white'>
                                {isloading && (<h2 className='text-center'>Loading...</h2>)}
                                {
                                    data.followers?.map((follower, i) => (
                                        <UserProfile
                                            key={i}
                                            username={follower.username}
                                            name={follower.name}
                                            image={follower.image}
                                        />
                                    ))
                                }
                            </div>
                        </Tab>
                        <Tab className='instructor__area ' eventKey="Followings" title="Followings">
                            <div className='row instructor__width bg-white'>
                                {isloading && (<h2 className='text-center'>...Loading</h2>)}
                                {
                                    data.followings?.map((following, i) => (
                                        <UserProfile
                                            key={i}
                                            username={following.username}
                                            name={following.name}
                                            image={following.image}
                                        />
                                    ))
                                }
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Audience