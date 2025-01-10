import React from 'react';
import Select from 'react-select'

const SelectBox = ({ options, name, onChange, ...props }) => {
    return (
        <Select
            className="basic-single"
            classNamePrefix="select"
            isClearable
            isSearchable
            isRtl={false}
            name={name}
            onChange={onChange}
            options={options}
            {...props}
        />
    )
}

export default React.memo(SelectBox)