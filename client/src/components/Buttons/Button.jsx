import React from 'react'

const Button = ({ type, text, ref, ...props }) => {
    return (
        <button
            type={type}
            ref={ref}
            {...props}
        >
            {text}
        </button>
    )
}

export default React.memo(Button)