import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const UploadAssignment = (props) => {

    const { show, deleteRecord, onHide } = props

    const modalLoaded = () => {

    }
    return (
        <Modal
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
            onHide={onHide}
            onEntered={modalLoaded}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Submit Assignment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Button variant="primary" size="large">Upload Assignment</Button>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={deleteRecord} variant="danger">
              Delete
            </Button> */}
            <Button onClick={() => onHide()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
    )
}
export default UploadAssignment