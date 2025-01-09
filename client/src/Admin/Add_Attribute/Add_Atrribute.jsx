import React from 'react'
import { Input, Button } from '../../components/component'

const Add_Atrribute = ({ register, closebtn }) => {

    return (
        <>
            <div className={`atrribute`} style={{ border: '0.5px solid #E4E6F0', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                <div className="d-flex align-items-start mb-3">
                    <div className="flex-grow-1">
                        <label htmlFor="title2" className="form-label">Title</label>
                        {
                            closebtn
                                ? <Button
                                    type={'button'}
                                    onClick={(e) => e.target.closest('.atrribute').remove()}
                                    icon={<i className="fas fa-close"></i>}
                                    className={"remove-btn float-end"}
                                />
                                : ''
                        }
                        <Input
                            type={"text"}
                            className={"form-control py-2"}
                            id={"title2"}
                            placeholder={"Enter title"}
                            {...register('title')}
                        />
                    </div>
                </div>
                <div className="mb-2">
                    <label htmlFor="description2" className="form-label">Description</label>
                    <Input
                        type={"text"}
                        className={"form-control py-2"}
                        id={"description2"}
                        placeholder={"Enter description"}
                        {...register('description')}
                    />
                </div>
            </div>
        </>
    )
}

export default React.memo(Add_Atrribute)