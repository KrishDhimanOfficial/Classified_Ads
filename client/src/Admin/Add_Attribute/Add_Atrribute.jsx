import React from 'react'
import { Input, Button } from '../../components/component'

const Add_Atrribute = ({ register, errors, index, remove, closebtn }) => {
    return (
        <>
            <div className={`atrribute`} style={{ border: '0.5px solid #E4E6F0', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                <div className="d-flex align-items-start mb-3">
                    <div className="flex-grow-1">
                        <label htmlFor={`title2-${index}`} className="form-label">Title</label>
                        {
                            (closebtn && (
                                <Button
                                    type={'button'}
                                    onClick={remove} // Call the `remove` to remove Attribute
                                    icon={<i className="fas fa-close"></i>}
                                    className={"remove-btn float-end"}
                                />)
                            )
                        }
                        <Input
                            type={"text"}
                            className={"form-control py-2"}
                            id={`title2-${index}`}
                            placeholder={"Enter title"}
                            style={{
                                border: errors.attributes && errors.attributes[index]?.name.message
                                    ? '1px solid red'
                                    : ''
                            }}
                            {...register(`attributes.${index}.name`)}
                        />
                        {errors.attributes && errors.attributes[index] && (
                            <span className='fs-6 text-danger m-0 mt-1'>
                                {errors.attributes[index].name.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className="mb-2">
                    <label htmlFor={`description2-${index}`} className="form-label">Description</label>
                    <Input
                        type={"text"}
                        className={"form-control py-2"}
                        id={`description2-${index}`}
                        placeholder={"Enter description"}
                        style={{
                            border: errors.attributes && errors.attributes[index]?.value.message
                                ? '1px solid red'
                                : ''
                        }}
                        {...register(`attributes.${index}.value`)}
                    />
                    {errors.attributes && errors.attributes[index] && (
                        <span className='fs-6 text-danger m-0 mt-1'>
                            {errors.attributes[index].value.message}
                        </span>
                    )}
                </div>
            </div>
        </>
    )
}

export default React.memo(Add_Atrribute)