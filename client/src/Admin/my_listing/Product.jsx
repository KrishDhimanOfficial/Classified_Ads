import React from 'react'
import { Image } from '../../components/component'
import { Link } from 'react-router-dom'

const Product = ({ path, title, price, publishStatus, slug }) => {
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
                        7 months ago
                    </span>
                </div>
                <div className="d-flex align-items-center">
                    <span className={`${publishStatus ? 'status': 'unstatus'} me-3`}>
                        {
                            publishStatus ? ' APPROVED' : 'PENDING'
                        }
                    </span>
                    <i className="fas fa-eye me-1">
                    </i>
                    <span className="text-muted">
                        381
                    </span>
                </div>
            </div>
            <div className="ms-auto published-toggle">
                <span>
                    Published
                </span>
                <div className="form-check form-switch">
                    <input className="form-check-input" id="flexSwitchCheckChecked" type="checkbox" />
                </div>
                <Link to='#'>
                    <i className="fas fa-ellipsis-v ms-3">
                    </i>
                </Link>
            </div>
        </div>
    )
}

export default React.memo(Product)