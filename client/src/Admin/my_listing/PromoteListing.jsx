import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'

const PromoteListing = ({ show, setShow }) => {
    return (
        <>
            <Offcanvas placement='end' style={{ zIndex: '999999' }} show={show} onHide={setShow} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Ad Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default React.memo(PromoteListing)