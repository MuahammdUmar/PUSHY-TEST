import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Spinner } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { CREATE_COURSE_SCHEDULE, DELETE_COURSE_SCHEDULE, GET_ALL_USERS, GET_ASSIGN_BY_STU_ASSIGN, UPDATE_STUDENT_ASSIGNMENT, UPDATE_COURSE_SCHEDULE } from '../../shared/constants';
import { useToasts } from 'react-toast-notifications';
import './StudentAssignmentModal.css'
import Select from 'react-select';
import filePickerService from '../../shared/file-stack/file-picker.service';
import PreviewDocument from "../../components/PreviewDocument/PreviewDocument";



const StudentAssignmentModal = (props) => {

  const { show, courseId, onHide, scheduleId, clickedEventData, selCourseTimings } = props

  const [studentAssignData, setStudentAssignData] = useState({})
  const [tutorComments, setTutorComments] = useState('')
  const [marksObtained, setMarksObtained] = useState('')
  const [marksObtainedError, setMarksObtainedError] = useState('')
  const [updateIdPreview, setupdateIdPreview] = useState(0);
  const [previewShow, setPreviewshow] = useState(false);




  const { addToast } = useToasts()

  const { loading: loadingAssingStu, data: dataAssingStu, error: errorAssingStu } = useQuery(GET_ASSIGN_BY_STU_ASSIGN, {
    variables: {
      StudentAssignmentId: props && props.studAssingId
    },
    skip: props && props.studAssingId === 0,
    onCompleted: () => {

    },
    onError: () => {

    }
  })


  const [updateCourseSchedule, { loading: loadingSchUpdate, data: dataSchUpdate, error: errorSchUpdate }] = useMutation(UPDATE_STUDENT_ASSIGNMENT, {
    onCompleted: () => {
      addToast('Course assignment updatad Successfully', { appearance: 'success' })
      //window.location.reload()
      props.onHide()
    },
    variables: {
      updateStudentAssignmentInput: {

        ObtainedMarks: marksObtained,
        TutorComment: tutorComments,
        Status: "Checked"

      },
      id: props && props.studAssingId
    },

    onError: () => {
      //Do nothing
    },
  })

  const changeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'tutorcomments') {
      setTutorComments(value)
    }
    else if (name === 'obtainedmarks') {

      if (!e.target.validity.valid) {
        setMarksObtainedError('Please enter interger values only')
        return
      }
      setMarksObtained(value)
    }
  }
  const submitHandler = () => {
    updateCourseSchedule()

  }

  const handlepreviewShow = (id) => {
    console.log("lllllllllllll",id)
    setupdateIdPreview(id);
    setPreviewshow(true);

  };
  const previewhandleClose = () => {
    
    setPreviewshow(false);
    setupdateIdPreview(0);
   
  };

  useEffect(() => {
    if (dataAssingStu) {
      console.log('jlkjlkjlkj', dataAssingStu.getAssignmentsByStudentAssignmentId)
      setTutorComments(dataAssingStu.getAssignmentsByStudentAssignmentId.TutorComment)
      setMarksObtained(dataAssingStu.getAssignmentsByStudentAssignmentId.ObtainedMarks)
      setStudentAssignData(dataAssingStu.getAssignmentsByStudentAssignmentId)
    }
  }, [dataAssingStu])

  const handleTimingSelect = (selopt) => {
    const value = selopt === null ? '' : selopt
    // setCourseTimings(value)
    // setCourseTimingsError('')
  }
  const handleSelectTutors = (selecopt) => {
    const value = selecopt === null ? '' : selecopt
    // setSelectedTutors(value)
    // setSelectedTutorsError('')
  }
  const delCourseSchedule = () => {
    //deleteCourseScheduler()
  }
  return (
    <>
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      onHide={onHide}
    //onEntered={modalLoaded}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Student Assignment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <div>
          <h6>Total Points:&nbsp;&nbsp;<span>{studentAssignData.TotalMarks ? studentAssignData.TotalMarks : 0}</span></h6>
        </div>
        <div className="detailInfo">
          <h6>Student Attatchment:&nbsp;&nbsp;</h6>
          {studentAssignData && studentAssignData.StudentAttachment ?
               <button  onClick={() => handlepreviewShow(studentAssignData.StudentAttachment.AttachmentId)} className="dropdown-item" href="#">
                            Preview
                          </button> : 'No attatchment found'
          }
        </div>
        <Row className="mb-3">
          <Form.Group controlId="tutorComments">
            <Form.Label className="my-1">Tutor Comments</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Tutor Comments"
              name="tutorcomments"
              onChange={changeHandler}
              value={tutorComments}
              rows={3}
            />
          </Form.Group>
          {/* <div className="text-danger">{courseAssignmentsError}</div> */}
        </Row>
        <Row className='mb-3'>
          <Form.Group controlId="totalMarks">
            <Form.Label className="my-1">Points Obtained</Form.Label>
            <Form.Control
              as="input"
              type="tel"
              pattern="[0-9]*"
              name="obtainedmarks"
              onChange={changeHandler}
              maxLength={5}
              //type="number"
              value={marksObtained}

            />
          </Form.Group>
          <div className="text-danger">{marksObtainedError}</div>
        </Row>
        {loadingAssingStu &&
          <div className="loading-indicator">
            <Spinner animation="border" variant="primary" />
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="danger">Delete</Button>  */}
        <Button variant="success" onClick={submitHandler}>Save</Button>
        <Button onClick={() => onHide()}>Cancel</Button>
      </Modal.Footer>
    </Modal>


     <PreviewDocument
     show={previewShow}
      onHide={previewhandleClose}
     documentId={updateIdPreview}
    // ducumenttypeid={props.documentTypeId} 
   />

   </>
  )
}
export default StudentAssignmentModal