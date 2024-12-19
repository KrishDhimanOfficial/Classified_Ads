import React from 'react'

const Submit = ({ text, classs, props, ref }) => {

    return (
        <Button
            ref={ref}
            type='submit'
            className={classs}
            {...props}
        >
            {text}
        </Button>
    )
}

export default Submit