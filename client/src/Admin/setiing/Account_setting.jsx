import React, { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { BTN, Input } from '../../components/component'
import DataService from '../../hooks/DataService'
import GetCookie from '../../hooks/GetCookie'
import { useNavigate } from 'react-router-dom'

const Account_setting = () => {
    const navigate = useNavigate()
    const inputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState('')
    const [show, setShow] = useState(false)

    const handleDeleteAccount = async () => {
        try {
            setLoading(true)
            if (confirm === 'DELETE MY ACCOUNT') {
                const res = await DataService.delete(`/seller/profile`, {
                    headers: {
                        'authorization': `Bearer ${GetCookie()}`
                    }
                })
                if (res.message) navigate('/'), localStorage.removeItem('seller_token')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Modal show={show} onHide={() => setShow(!show)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Account Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b className='text-uppercase'>Warning</b>: Deleting your account will permanently remove all your data and listings. This action cannot be reversed.
                    <p className='my-3'>
                        Type <b> "DELETE MY ACCOUNT" </b> to Confirm.
                    </p>
                    <Input
                        ref={inputRef}
                        type={'text'}
                        className='form-control'
                        style={{ border: confirm !== 'DELETE MY ACCOUNT' ? '1px solid red' : '1px solid #ced4da' }}
                        placeholder={'type here....'}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <BTN
                        text={'Close'}
                        className={'btn btn-secondary'}
                        onClick={() => setShow(!show)}
                    />
                    <BTN
                        text={'Understood'}
                        className={'btn btn-danger'}
                        icon={loading && <div className="spinner-border text-light me-2" role="status"><span className="visually-hidden">Loading...</span></div>}
                        disabled={loading}
                        onClick={() => { handleDeleteAccount(), setConfirm(inputRef.current.value) }}
                    />
                </Modal.Footer>
            </Modal>
            <BTN
                text={'Delete Account'}
                className={'btn btn-danger float-start'}
                onClick={() => { setShow(!show) }}
            />
        </>
    )
}

export default Account_setting