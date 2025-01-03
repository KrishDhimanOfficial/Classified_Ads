import React from 'react'

const Placeholder = () => {
    return (
        <div className="card p-0">
            <div className="card__skeleton card__description mb-3"></div>
            <div className='p-4'>
                <div className="card__skeleton card__title w-75 mb-2"></div>
                <div className="card__skeleton card__title w-50 mb-2"></div>
                <div className="card__skeleton card__title w-25"></div>
                <div className="d-flex gap-1">
                    <div className="card__skeleton card__title w-50 mb-2 rounded-2"></div>
                    <div className="card__skeleton card__title w-50 mb-2 rounded-2"></div>
                </div>
            <div className="card__skeleton card__title w-100 mt-2"></div>
            </div>
        </div>
    )
}

export default Placeholder