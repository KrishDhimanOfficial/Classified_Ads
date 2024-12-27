import React from 'react'

const Submit = ({ text, classs, ref, ...props }) => {

    return (
        <button
            ref={ref}
            type='submit'
            className={classs}
            {...props}
        >
            {text}
        </button>
    )
}

export default React.memo(Submit)