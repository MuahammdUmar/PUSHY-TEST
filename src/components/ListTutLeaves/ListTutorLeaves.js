import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Table, Spinner } from 'react-bootstrap'
import moment from 'moment'
import {
  MdOutlineCheckCircleOutline,
  MdOutlineHighlightOff,
} from "react-icons/md";
import { useMutation, useQuery } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { APPROVE_LEAVE, GET_ALL_LEAVE_APPLICATIONS, GET_LEAVE_APPL_BY_ID, REJECT_LEAVE, } from '../../shared/constants';

const DetailListTutorLeaves = (props) => {

    const { show, onHide, tutorId } = props
   
    const [allLeaveAppl, setAllLeaveAppl] = useState([])
    const [leaveAppl, setLeaveAppl] = useState({})
    const { addToast } = useToasts()

    const modalLoaded = () => {

    }

    const { loading: loadingLeaveAppl, data: dataLeaveAppl, error: errorLeaveAppl, } = useQuery(GET_LEAVE_APPL_BY_ID, {
        variables: { tutorId: props && props.tutorId, id: props && props.scheduleId },
        //skip: props && props.tutorId === undefined,
        onError: () => {
            //
        },
        onCompleted: () => {

        }
    })
    const [approveLeaveMut, { loading: loadingApprove, error: errorApprove }] = useMutation(APPROVE_LEAVE, {
        onError: () => {
            //setDeleteDialogOpen(false)
        },
        onCompleted: () => {
            addToast("Leave application approved successfully", { appearance: "success" });
        },

    });

    const [rejectLeaveMut, { loading: loadingReject, error: errorReject }] = useMutation(REJECT_LEAVE, {
        onError: () => {
            //setDeleteDialogOpen(false)
        },
        onCompleted: () => {
            addToast("Leave application rejected successfully", { appearance: "success" });
            //setSelectedCourses([])
        },
        // refetchQueries: [{ query: GET_ALL_ASSIGNMENTS }],
        // awaitRefetchQueries: true,
    });
    useEffect(() => {
        if (dataLeaveAppl) {
            console.log('dataLeaveAppl.getLeaveApplicationByScheduleId', dataLeaveAppl.getLeaveApplicationByScheduleId)
            //setAllLeaveAppl(dataLeaveAppl.getLeaveApplications)
            setLeaveAppl(dataLeaveAppl.getLeaveApplicationByScheduleId)
        }

    }, [dataLeaveAppl])

    const approveLeave = (tid) => {
        approveLeaveMut({
            variables: { id: tid },
            refetchQueries: [{ query: GET_LEAVE_APPL_BY_ID, variables: { tutorId: props && props.tutorId, id: props && props.scheduleId } }],
            awaitRefetchQueries: true,
            update: (cache) => {
                cache.evict({
                    id: "ROOT_QUERY",
                    field: "id",
                });
            },
        })
    }
    const rejectLeave = (tid) => {
        rejectLeaveMut({
            variables: { id: tid },
            refetchQueries: [{ query: GET_LEAVE_APPL_BY_ID, variables: { tutorId: props && props.tutorId, id: props && props.scheduleId } }],
            awaitRefetchQueries: true,
            update: (cache) => {
                cache.evict({
                    id: "ROOT_QUERY",
                    field: "id",
                });
            },
           
        })
    }
    
    return (
        // <Modal
        //     show={show}
        //     size="md"
        //     aria-labelledby="contained-modal-title-vcenter"
        //     centered
        //     scrollable
        //     onEntered={modalLoaded}
        //     onHide={onHide}
        // >
        <>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Leave Application Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Button onClick={() => props.onBack()}>Back</Button>
                <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            {/* <th>Course Name</th> */}
                            <th>Tutor Name</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveAppl.id === null ? 'No data found' : 
                                <tr>
                                    {/* <td>{lvappl.CourseName}</td> */}
                                    <td>{leaveAppl && leaveAppl.Tutor && leaveAppl.Tutor.Firstname}</td>
                                    <td>{leaveAppl && leaveAppl.AbsentReason}</td>
                                    <td>{leaveAppl && leaveAppl.Status}</td>
                                    <td>
                                    
                                    
                                     <button className="btn" onClick={() => approveLeave(leaveAppl.id)}><MdOutlineCheckCircleOutline fontSize={25} fill="green" /></button>
                                     <button className="btn" onClick={() => rejectLeave(leaveAppl.id)}><MdOutlineHighlightOff fontSize={25} fill="red" /></button>
                                    
                                    </td>
                                </tr>
                          }
                           
                        {loadingLeaveAppl &&
                            <div className="loading-indicator">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        }
                    </tbody>
                </table>

            </Modal.Body>
            </>
        // </Modal>
    )
}
export default DetailListTutorLeaves