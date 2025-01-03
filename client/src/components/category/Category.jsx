import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({ imgpath, category, listedProduct }) => {
    return (
        <div className="item__inner">
            <div className="icon">
                <img src={imgpath || '/assests/opne.jpg'} alt="Icon image" />
            </div>
            <div className="back-content">
                <h3 className="back-title"><Link to="#">{category}</Link></h3>
                <p>{listedProduct}</p>
            </div>
        </div>
    )
}

export default React.memo(Category)
