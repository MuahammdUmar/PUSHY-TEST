import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Table, Spinner } from 'react-bootstrap'
import moment from 'moment'
import {
    FcApprove,
    FcDisapprove,
} from "react-icons/fc";
import { useMutation, useQuery } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { APPROVE_TUTOR_SINGLE_COURSE, GET_TUTOR_COURSES_BY_ID, REJECT_TUTOR_SINGLE_COURSE } from '../../shared/constants';

const DetailListModal = (props) => {

    const { show, onHide, tutorId } = props
    const [allTutorCourses, setAllTutorCourses] = useState([])
    const { addToast } = useToasts()

    const modalLoaded = () => {

    }

    const { loading: loadingCourses, data: dataCourses, error: errorCourses, } = useQuery(GET_TUTOR_COURSES_BY_ID, {
        variables: { id: props && props.tutorId },
        //skip: props && props.tutorId === undefined,
        onError: () => {
            props.onHide()
        },
    })
    const [approveCoursesMut, { loading: loadingApprove, error: errorApprove }] = useMutation(APPROVE_TUTOR_SINGLE_COURSE, {
        onError: () => {
            //setDeleteDialogOpen(false)
        },
        onCompleted: () => {
            addToast("Tutor courses approved successfully", { appearance: "success" });
        },

    });

    const [rejectCourseMut, { loading: loadingReject, error: errorReject }] = useMutation(REJECT_TUTOR_SINGLE_COURSE, {
        onError: () => {
            //setDeleteDialogOpen(false)
        },
        onCompleted: () => {
            addToast("Tutor courses rejected successfully", { appearance: "success" });
            //setSelectedCourses([])
        },
        // refetchQueries: [{ query: GET_ALL_ASSIGNMENTS }],
        // awaitRefetchQueries: true,
    });
    useEffect(() => {

        if (dataCourses) {
            console.log('all Coursessssssssssssss', dataCourses.getAllCoursesForTutor)
            setAllTutorCourses(dataCourses.getAllCoursesForTutor)
        }

    }, [dataCourses])
    const approveCourse = (tid) => {
        approveCoursesMut({
            variables: { CourseId: tid, id: props && props.tutorId },
            refetchQueries: [{ query: GET_TUTOR_COURSES_BY_ID, variables: { id: tid } }],
            awaitRefetchQueries: true,
            update: (cache) => {
                cache.evict({
                    id: "ROOT_QUERY",
                    field: "id",
                });
            },
        })
    }
    const rejectCourse = (tid) => {
        rejectCourseMut({
            variables: { CourseId: tid, id: props && props.tutorId },
            refetchQueries: [{ query: GET_TUTOR_COURSES_BY_ID, variables: { id: props && props.tutorId } }],
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
                    Approve/DisApprove Detail
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button onClick={() => props.onBack()}>Back</Button>
                <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTutorCourses.length > 0 && allTutorCourses.map((ctutor, index) => {
                            return (
                                <tr>
                                    <td>{ctutor.CourseName}</td>
                                    <td>{ctutor.Status}</td>
                                    <td>
                                        <button className="btn" onClick={() => approveCourse(ctutor.id, ctutor.Status)}><FcApprove fontSize={25} fill="yellow" /></button>
                                        <button className="btn" onClick={() => rejectCourse(ctutor.id)}><FcDisapprove fontSize={25} fill="red" /></button>
                                    </td>
                                </tr>
                            )

                        }

                        )}
                        {/* {allTutorCourses.length === 0 && <div>No data found</div>} */}
                        {loadingCourses &&
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
export default DetailListModal