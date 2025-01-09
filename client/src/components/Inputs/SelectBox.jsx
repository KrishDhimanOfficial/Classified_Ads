import React from 'react'

const SelectBox = ({ Defaultoption, options, ref, ...props }) => {
    return (
        <select ref={ref}  {...props} >
            {Defaultoption}
            {
                options?.map((option, i) => (
                    <option value={option._id} key={i}>
                        {option?.title}
                    </option>
                ))
            }
        </select>
    )
}

export default React.memo(SelectBox)