import React, { useCallback, useState } from 'react'
import { Image, Input } from '../../components/component'
import { useNavigate } from 'react-router-dom'
import DataService from '../../hooks/DataService'
import GetCookie from '../../hooks/GetCookie'
import Notify from '../../hooks/Notify'
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from 'react-bootstrap/Badge'
import { PromoteListing } from '../admin'

const Product = ({ id, path, status, title, price, ad_status, clicks, publishStatus, createdAt, slug, updatelisting }) => {
    const navigate = useNavigate()
    const [checkedStatus, setCheckedInput] = useState(status)
    const [show, setShow] = useState(false)

    const deleteListing = async () => {
        try {
            const res = await DataService.delete(`/product/${id}`, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                },
            })
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
        <div className="card d-flex flex-row align-items-start w-100 mt-0 mx-md-2 mx-0">
            <Image
                src={path}
                className='object-fit-cover'
                style={{ width: '150px', height: '150px' }}
            />
            <div className="ms-md-4 ms-3">
                <h5 className="mb-2 text-start">{title}</h5>
                <h6 className="text-primary mb-3 text-start">
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                    {price}
                </h6>
                <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-clock me-2"> </i>
                    <span className="text-muted"> {createdAt} </span>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <Badge bg="none" className={`${publishStatus ? 'status' : 'unstatus'}`}>
                        {publishStatus ? ' APPROVED' : 'PENDING'}
                    </Badge>
                    {
                        ad_status && (
                            <>
                                <Badge bg="info">Featured</Badge>
                                <i className="fas fa-eye ms-3 me-1"> </i>
                                <span className="text-muted">{clicks}</span>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="ms-auto published-toggle d-flex flex-lg-row flex-column">
                <span> Published </span>
                <div className="form-check form-switch ps-1 pe-4">
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
                        <i className="fa-solid fa-angle-down"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href={slug} target='_blank'>View</Dropdown.Item>
                        <Dropdown.Item href={updatelisting}>Edit</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={(e) => { e.preventDefault(), deleteListing() }}>
                            Delete
                        </Dropdown.Item>
                        <Dropdown.Item href='#' onClick={(e) => { e.preventDefault(), setShow(true) }}>
                            {/* {ad_status ? 'Unpromote' : 'Promote'} */}
                            Ad Setting
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <PromoteListing show={show} setShow={() => setShow(false)} />
        </div>
    )
}

export default React.memo(Product)