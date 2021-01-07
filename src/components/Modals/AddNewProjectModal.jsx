
import React, { useState, useEffect, useCallback } from "react";
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import '../style.css'


export default function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
           </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
