import React from 'react'

const Button = ({ type, text, classs, props, ref }) => {
    return (
        <Button
            ref={ref}
            type={type}
            className={classs}
            {...props}
        >
            {text}
        </Button>
    )
}

export default Button