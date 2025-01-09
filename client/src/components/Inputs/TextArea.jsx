import React from 'react'

const TextArea = ({ ...props }) => {
    return (
        <textarea style={{height:'150px'}} {...props}></textarea>
    )
}

export default React.memo(TextArea)
