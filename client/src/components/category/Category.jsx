import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "motion/react"

const Category = ({ imgpath, category, listedProduct }) => {
    return (
        <motion.div
            initial={{ opacity: 0, translateY: 100 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1 }}
            className="item__inner"
        >
            <div className="icon">
                <img src={imgpath || '/assests/opne.jpg'} className='object-fit-cover w-100' style={{ height: '150px' }} alt="Icon image" />
            </div>
            <div className="back-content">
                <h3 className="back-title"><Link to="/browse-products">{category}</Link></h3>
                <p>{listedProduct}</p>
            </div>
        </motion.div>
    )
}

export default React.memo(Category)