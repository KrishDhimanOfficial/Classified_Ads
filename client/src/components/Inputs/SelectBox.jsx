import React from 'react';
import Select from 'react-select'

const SelectBox = ({ options, name, register, error, onChange, ...props }) => {
    return (
        <Select
            className="basic-single"
            classNamePrefix="select"
            isClearable={true}
            isSearchable
            isRtl={false}
            register
            name={`${name}`}
            onChange={onChange}
            options={options}
            styles={{
                control: (style) => ({
                    ...style,
                    border: error ? '1px solid red' : ''
                })
            }}
            {...props}
        />
    )
}

export default React.memo(SelectBox)