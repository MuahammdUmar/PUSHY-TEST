import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const DeleteModal = (props) => {

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
                    Delete Course
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Label>
              Are you sure want to delete this record? You will not be able to
              retrieve it later.
            </Form.Label>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={deleteRecord} variant="danger">
              Delete
            </Button>
            <Button onClick={() => onHide()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
    )
}
export default DeleteModal