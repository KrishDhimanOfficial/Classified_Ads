import React from 'react'

const Button = ({ type, text, ref, icon = '', ...props }) => {
    return (
        <button
            type={type}
            ref={ref}
            {...props}
        >
            {icon}
            {text}
        </button>
    )
}

export default React.memo(Button)