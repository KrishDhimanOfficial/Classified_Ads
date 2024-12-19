import React from 'react'

const Input = ({ type, ref, classs, props }) => {
    return (
        <Input
            type={type}
            ref={ref}
            className={`${classs}`}
            {...props}
        />
    )
}

export default Input
