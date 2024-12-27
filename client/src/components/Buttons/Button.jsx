import React from 'react'

const Button = ({ type, text, classs, ref, ...props }) => {
    return (
        <button
            type={type}
            ref={ref}
            className={classs}
            {...props}
        >
            {text}
        </button>
    )
}

export default React.memo(Button)