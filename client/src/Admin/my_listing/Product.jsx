import React, { useCallback, useEffect, useState } from 'react'
import { Image, Input } from '../../components/component'
import { useNavigate } from 'react-router-dom'
import DataService from '../../hooks/DataService'
import GetCookie from '../../hooks/GetCookie'
import Notify from '../../hooks/Notify'
import Dropdown from 'react-bootstrap/Dropdown'

const Product = ({ id, path, status, title, price, ad_status, clicks, publishStatus, createdAt, slug, updatelisting }) => {
    const navigate = useNavigate()
    const [checkedStatus, setCheckedInput] = useState(status)

    const deleteListing = async () => {
        try {
            const res = await DataService.delete(`/product/${id}`, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                },
            })
            if (res.error) navigate('/login')
            Notify(res)
        } catch (error) {
            console.error('deleteListing : ', error)
        }
    }

    const updateStatus = useCallback(async (status) => {
        try {
            const res = await DataService.patch(`/product/${id}`, { status }, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
            Notify(res)
        } catch (error) {
            console.error('updateStatus : ', error)
        }
    }, [])

    const promoteListing = async () => {
        try {
            const res = await DataService.patch(`/promote-listing/${id}`, { status: !ad_status }, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
            Notify(res)
        } catch (error) {
            console.error('promoteListing : ', error)
        }
    }

    return (
        <div className="card d-flex flex-row align-items-start w-100">
            <Image alt="#"
                className="object-fit-cover"
                src={path}
                style={{ width: '150px', height: '150px' }} />
            <div className="ms-5">
                <h5 className="mb-2 text-start">
                    {title}
                </h5>
                <h6 className="text-primary mb-3 text-start">
                    ${price}
                </h6>
                <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-clock me-2">
                    </i>
                    <span className="text-muted">
                        {createdAt}
                    </span>
                </div>
                <div className="d-flex align-items-center">
                    <span className={`${publishStatus ? 'status' : 'unstatus'} me-3`}>
                        {
                            publishStatus ? ' APPROVED' : 'PENDING'
                        }
                    </span>
                    {
                        ad_status && (
                            <>
                                <span className='status bg-primary text-white text-uppercase'>
                                    Featured
                                </span>
                                <i className="fas fa-eye ms-3 me-1">
                                </i>
                                <span className="text-muted">
                                    {clicks}
                                </span>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="ms-auto published-toggle">
                <span>
                    Published
                </span>
                <div className="form-check form-switch px-4">
                    <Input
                        type={"checkbox"}
                        onChange={(e) => { setCheckedInput(prev => !prev), updateStatus(e.target.checked) }}
                        className={"form-check-input"}
                        id={"flexSwitchCheckChecked"}
                        checked={checkedStatus}
                    />
                </div>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" >
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href={slug}>View</Dropdown.Item>
                        <Dropdown.Item href={updatelisting}>Edit</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={(e) => { e.preventDefault(), deleteListing() }}>
                            Delete
                        </Dropdown.Item>
                        <Dropdown.Item href='#' onClick={(e) => { e.preventDefault(), promoteListing() }}>
                            {ad_status ? 'Unpromote' : 'Promote'}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default React.memo(Product)