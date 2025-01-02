import React from 'react'

const Sec_Heading = ({ title, subtitle }) => {
    return (
        <div className="back__title__section text-center">
            <h6 className="back__subtitle">{title}</h6>
            <h2 className="back__tittle">{subtitle}</h2>
        </div>
    )
}

export default React.memo(Sec_Heading)
