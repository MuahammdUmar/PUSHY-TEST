import React, { useState } from 'react'
import { Modal, Button, Form, Table } from 'react-bootstrap'
import moment from 'moment'
import './EventSchDetail.css'

const EventSchDetail = (props) => {

  const { show, deleteRecord, onHide, eventData } = props
  console.log('props', props)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const modalLoaded = () => {

  }
  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      onEntered={modalLoaded}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Event Schedule Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      </Modal.Body>
    </Modal>
  )
}
export default EventSchDetail