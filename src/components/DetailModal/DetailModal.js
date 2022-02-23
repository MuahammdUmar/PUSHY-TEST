import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Row, Spinner } from "react-bootstrap";
import moment from "moment";
import "./DetailModal.css";
import { APPLY_LEAVE_TUTOR, GET_SCHEDULE_BY_ID_COURSE } from "../../shared/constants";
import { useMutation, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";

const DetailModal = (props) => {

  const { show, courseId, onHide, scheduleId } = props;

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [eventData, setEventData] = useState({})
  const [reasonText, setReasonText] = useState('')
  const [reasonTextError, setReasonTextError] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))
  const { addToast } = useToasts()


  const [pageCount, setPageCount] = useState(0)

  const modalLoaded = () => { };

  const [applyLeave, { loading, error, data }] = useMutation(APPLY_LEAVE_TUTOR, {
    variables: {
      createLeaveAttendanceInput: {
        ScheduleId: scheduleId,
        TutorId: (user && user.roles === 3) ? user.id :null,
        StudentId: (user && user.roles === 1) ? user.id:null,
        // StudentId: String
        AbsentReason: reasonText
      },
    },
    // refetchQueries: [{ query: GET_ALL_COURSES }],
    // awaitRefetchQueries: true,
    onError: () => {
      //Do nothing
    },
    onCompleted: () => {
      addToast("Reason submitted successfully", { appearance: "success" });
    },
  });

  const { loading: loadingScheduleDet, error: errorScheduleDet, data: dataScheduleDet } = useQuery(GET_SCHEDULE_BY_ID_COURSE, {
    variables: { scheduleId: props && props.scheduleId, courseId: props && props.courseId },
    //skip: !scheduleId || !courseId,

    onCompleted: (alldata) => { },
    onError: () => {
      //Do nothing
    },
  });

  const leaveApplication = () => {
    setPageCount(pageCount + 1)
  }

  useEffect(() => {
    if (dataScheduleDet) {
      console.log('dataScheduleDet.getSchedulerById', dataScheduleDet.getSchedulerById)
      setEventData(dataScheduleDet.getSchedulerById)
    }
  }, [dataScheduleDet])

  const changeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'reasonleave') {
      setReasonText(value)
      setReasonTextError('')
    }
  }

  const submitHanlder = () => {
    let pErr = false

    if (reasonText === '') {
      setReasonTextError("Please add reason for your leave")
      pErr = true
    }
    if (!pErr) {
      applyLeave()
    }
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
      {pageCount === 0 && <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Schedule Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingScheduleDet && <div className="loading-indicator">
            <Spinner animation="border" variant="primary" />
          </div>
          }
          <div className="class--join-button">
            <Button variant="primary">Join</Button>
          </div>
          <div className="eventRow">
            <div className="image">
              <img src="http://via.placeholder.com/300" alt="placeholder" />
            </div>
            <div className="content">
              <h4 className="card-tital h4">
                <span>{eventData.CourseName}</span>
              </h4>
              <div className="eventField d-flex justify-content-between align-self-center mb-2">
                <h6 className="mb-0">CourseTime:&nbsp;&nbsp; </h6>
                <p className="noon-time btn-xs mx-0">
                  {eventData.CourseTime}
                </p>
              </div>
              <div className="eventField d-flex justify-content-between align-self-center mb-2">
                <h6 className="mb-0">Start Time:&nbsp;&nbsp; </h6>
                <p>
                  {moment(eventData.SchedulerStartTime).format(
                    "DD MM YYYY hh:mm:ss A"
                  )}
                </p>
              </div>
              <div className="eventField d-flex justify-content-between align-self-center mb-2">
                <h6 className="mb-0">End Time:&nbsp;&nbsp; </h6>
                <p>
                  {moment(eventData.SchedulerEndTime).format(
                    "DD MM YYYY hh:mm:ss A"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="eventText px-0">
            <h5>Course Title:</h5>
            <p>{eventData.Title}</p>
            <h5>Course Description:</h5>
            <p>{eventData.Description}</p>
            
            {eventData.AbsentReason !== null &&
              <>
              {user && user.roles === 3 ?
                <h5>Tutor Leave Reason:</h5>
                : user && user.roles === 1 ?
                <h5>Student Leave Reason:</h5>:null
            }
                <p>{eventData.AbsentReason}</p>
              </>
            }

          </div>
        </Modal.Body>
        {eventData.AbsentReason === null &&
        <Modal.Footer>
          <Button onClick={leaveApplication}>Apply Leave</Button>
        </Modal.Footer>
          }

        {/* {user && user.roles === 3 && 
        <Modal.Footer>
          <Button onClick={leaveApplication}>Apply Leave</Button>
        </Modal.Footer>} */}

      </>}
      {pageCount === 1 && <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {user && user.roles === 3 ?
           <> Tutor Leave Form</>
            : user && user.roles === 1 ?
            <> Student Leave Form </>:null
          }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="class--join-button">
            <Button variant="primary" onClick={() => setPageCount(pageCount - 1)}>Back</Button>
          </div>
          <Row className="mb-3">
            <Form.Group controlId="courseDescription">
              <Form.Label className="my-1">Reason For Leave</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Reason for leave"
                maxLength={"1000"}
                name="reasonleave"
                onChange={changeHandler}
                ///value={courseDescription}
                rows={3}
              />
            </Form.Group>
            <div className="text-danger">{reasonTextError}</div>

          </Row>
          
          <Button onClick={submitHanlder}>Submit Reason</Button>
          
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setPageCount(pageCount - 1)}>Cancel</Button>
        </Modal.Footer> */}
      </>}
    </Modal>
  );
};
export default DetailModal;
