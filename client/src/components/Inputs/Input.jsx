import React from 'react'

const Input = ({ type, ref, classs, ...props }) => {
    return (
        <input
            type={type}
            ref={ref}
            className={`${classs}`}
            {...props}
        />
    )
}

export default React.memo(Input)
