import React from 'react'

const Input = ({ type, ref, ...props }) => {
    return (
        <input
            type={type}
            ref={ref}
            {...props}
        />
    )
}

export default React.memo(Input)
