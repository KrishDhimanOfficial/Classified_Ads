import React from 'react'

const Submit = ({ text, ref, ...props }) => {

    return (
        <button
            ref={ref}
            type='submit'
            {...props}
        >
            {text}
        </button>
    )
}

export default React.memo(Submit)