import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col, InputGroup } from "react-bootstrap";
import {
  CREATE_ASSIGNMENT,
  GET_ALL_ASSIGNMENTS,
  GET_ALL_TUTORS_COURSES,
  GET_ALL_USERS,
  GET_ASSIGNMENT_BY_ID,
  UPDATE_ASSIGNMENT,
  UPDATE_COURSE,
} from "../../shared/constants";
import { useToasts } from "react-toast-notifications";
import { useMutation, useQuery } from "@apollo/client";
import DatePicker from "react-datepicker";
import Select from "react-select";
import FilePicker from "../../shared/file-stack/file-picker";

const AssignmentModal = (props) => {
  const { addToast } = useToasts();

  const user = JSON.parse(localStorage.getItem("user"));

  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentDescriptionError, setAssignmentDescriptionError] =
    useState("");
  const [startTime, setStartTime] = useState(null);
  const [startTimeError, setStartTimeError] = useState("");
  const [endTime, setEndTime] = useState(null);
  const [endTimeError, setEndTimeError] = useState("");
  const [multiFiles, setMultitFiles] = useState({});

  const [assignmentTimings, setAssignmentTimings] = useState([]);
  const [assignmentTimingsError, setAssignmentTimingsError] = useState("");

  const [assignmentNameError, setAssignmentNameError] = useState("");

  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourses, setAllSelectedCourses] = useState({});
  const [selectedCoursesError, setSelectedCoursesError] = useState("");
  const [courseTimings, setAllCourseTimings] = useState([]);
  const [allCourseStudents, setAllCourseStudents] = useState([]);
  const [selectedStudents, setAllSelectedStudents] = useState([]);
  const [totalMarks, setTotalMarks] = useState("");
  const [totalMarksError, setTotalMarksError] = useState("");

  //const [allCourseTimings, setAllCourseTimings] = useState([])

  const [addAssignment, { loading, error, data }] = useMutation(
    CREATE_ASSIGNMENT,
    {
      variables: {
        createAssignmentInput: {
          CourseId: selectedCourses.value,
          TutorId: user && user.id,
          AssignmentName: assignmentName,
          Description: assignmentDescription,
          StartDate: startTime,
          EndDate: endTime,
          Attachment: multiFiles,
          CourseTime: assignmentTimings.map((cu) => cu.value),
          AssignStudents: selectedStudents.map((c) => c.value),
          TotalMarks: totalMarks,
        },
      },
      refetchQueries: [{ query: GET_ALL_ASSIGNMENTS }],
      awaitRefetchQueries: true,
      onError: () => {
        //Do nothing
      },
      onCompleted: () => {
        addToast("Assignment Created Successfully", { appearance: "success" });
        //window.location.reload()

        //history.push("/welcomepage")
        props.onHide();
      },
    }
  );

  const {
    loading: loadingAssignment,
    data: dataAssignment,
    error: errorAssignment,
  } = useQuery(GET_ASSIGNMENT_BY_ID, {
    variables: { id: props && props.assignmentId },
    skip: props.formType === 1,
    onError: () => {
      props.onHide();
    },
  });

  const afterMultiUpload = (files) => {
    setMultitFiles(files);
  };

  const [
    updateAssignment,
    { loading: loadingUpdate, data: dataUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_ASSIGNMENT, {
    onCompleted: () => {
      addToast("Assignment saved successfully", { appearance: "success" });
      //window.location.reload()

      props.onHide();
    },
    variables: {
      updateAssignmentInput: {
        CourseId: selectedCourses.value,
        TutorId: user && user.id,
        AssignmentName: assignmentName,
        Description: assignmentDescription,
        StartDate: startTime,
        EndDate: endTime,
        CourseTime: assignmentTimings.map((cu) => cu.value),
        //AssignStudents: selectedStudents.map(c => c.value)
        TotalMarks: totalMarks,
      },
      id: props && props.assignmentId,
    },
    refetchQueries: [{ query: GET_ALL_ASSIGNMENTS }],
    awaitRefetchQueries: true,
    onError: () => {
      //Do nothing
    },
  });

  const { loading: loadingAllCurrCourses, data: dataAllCurrCourses, error: errorAllCurrCourses} = useQuery(GET_ALL_TUTORS_COURSES, {
    onCompleted: () => {},
    onError: () => {
      //Do nothing
    },
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    if (dataAssignment) {
      console.log('dataAssignment.getAssignmentById', dataAssignment.getAssignmentById)
      setAssignmentName(dataAssignment.getAssignmentById.AssignmentName);
      setAssignmentDescription(dataAssignment.getAssignmentById.Description);
      setStartTime(new Date(dataAssignment.getAssignmentById.StartDate));
      setEndTime(new Date(dataAssignment.getAssignmentById.EndDate));
      setMultitFiles(dataAssignment.getAssignmentById.Attachment)
      setTotalMarks(dataAssignment.getAssignmentById.TotalMarks)
      setAssignmentTimings(
        dataAssignment.getAssignmentById.CourseTime.map((ctime) => ({
          value: ctime,
          label: ctime,
        }))
      );
      setAllCourseTimings(dataAssignment.getAssignmentById.CourseTime);
      setAllCourseStudents(dataAssignment.getAssignmentById.AssignStudents);
      if (dataAssignment.getAssignmentById.AssignStudents !== null) {
        setAllSelectedStudents(
          dataAssignment.getAssignmentById.AssignStudents.map((st) => ({
            value: st.id,
            label: st.Firstname,
          }))
        );
      }
      setAllSelectedCourses({
        value: dataAssignment.getAssignmentById.CourseId,
        label: dataAssignment.getAssignmentById.CourseName,
      });
    }
    if (dataAllCurrCourses) {
      setAllCourses(dataAllCurrCourses.getAllCoursesForCurrentTutor);
    }
  }, [dataAllCurrCourses, dataAssignment]);

  // const [validated, setValidated] = useState(false);
  const { show, onHide } = props;
  const deleteAssignment = () => {};
  const modalLoaded = () => {};

  const handleSelectCourses = (selecopt) => {
    // setSelectedTutors(selecopt)
    // setSelectedTutorsError('')
    const value = selecopt === null ? "" : selecopt;
    setAllSelectedCourses(value);
    setSelectedCoursesError("");

    if (selecopt !== null && Object.keys(selecopt).length > 0) {
      const courseFilter = allCourses.filter((course) => course.id === selecopt.value);
      console.log("courseFilter", courseFilter);
      setAllCourseTimings(courseFilter[0].CourseTime);
      setAllCourseStudents(courseFilter[0].EnrolledUsers);
    }
    if (selecopt === null) {
      setAllCourseTimings(null);
    }
  };
  const handleTimingSelect = (selopt) => {
    console.log("assignment timings", selopt);
    setAssignmentTimings(selopt);
    setAssignmentTimingsError("");
  };
  const handleSelectStudent = (selecopt) => {
    console.log("assigned students", selecopt);
    const value = selecopt === null ? "" : selecopt;
    setAllSelectedStudents(value);
    //setAllSelectedStudentsError('')
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "assignmentName") {
      setAssignmentName(value);
      setAssignmentNameError("");
    } else if (name === "assignmentDescription") {
      setAssignmentDescription(value);
      setAssignmentDescriptionError("");
    } else if (name === "totalMarks") {
      if (!e.target.validity.valid) {
        setTotalMarksError("Please enter interger values only");
        return;
      }
      setTotalMarks(value);
      setTotalMarksError("");
    }
    //else if (name === 'totalMarks') {
    //   setAssignmentOutcomes(value)
    //   setAssignmentOutcomesError('')
    // }
  };
  const handleSubmit = () => {
    let pErr = false;
    if (assignmentName === "") {
      setAssignmentNameError("Please enter assignment name");
      pErr = true;
    }

    if (assignmentTimings.length === 0) {
      setAssignmentTimingsError("Please select timings");
      pErr = true;
    }

    if (startTime === null || startTime === "") {
      setStartTimeError("Please select start timings");
      pErr = true;
    }

    if (endTime === null || endTime === "") {
      setEndTimeError("Please select end timings");
      pErr = true;
    }

    if (Object.keys(selectedCourses).length === 0) {
      setSelectedCoursesError("Please select course");
    }

    // if(props.formType === 2 && selectedTutors.length === 0){
    //   setSelectedTutorsError('Please select Tutors')
    //   pErr = true
    // }
    if (!pErr && props.formType === 1) {
      addAssignment();
    }

    if (!pErr && props.formType === 2) {
      console.log("edit called");
      updateAssignment();
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      show={show}
      onHide={onHide}
      onEntered={modalLoaded}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.formType === 1 ? "Add Assignment" : "Edit Assignment"}
        </Modal.Title>
      </Modal.Header>

      <Form>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
            <div className="d-inline-flex">
              <Form.Label>Assignment Name<span className="text-danger  required-text">*</span></Form.Label>
             </div>
              <Form.Control
                type="text"
                placeholder="Assignment Name"
                className={
                  assignmentNameError.length > 0
                    ? "form-control  is-invalid"
                    : "form-control "
                }
                name="assignmentName"
                onChange={changeHandler}
                value={assignmentName}
                aria-describedby="emailHelp"
              />
              <div className="text-danger">{assignmentNameError}</div>
            </Form.Group>

            {/* <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                name="assignmentCategory"
                onChange={changeHandler}
                value={assignmentCategory}
                handleTimingSelect
              />
              <div className="text-danger">{assignmentCategoryError}</div>
            </Form.Group> */}

            {/* <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Credit Hours</Form.Label>
              <Form.Control
                type="text"
                placeholder="Credit Hours"
                name="assignmentCreditHours"
                onChange={changeHandler}
                value={assignmentCreditHours}
              />
              <div className="text-danger">{assignmentCreditHoursError}</div>
            </Form.Group> */}
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="assignmentDescription">
              <Form.Label className="my-1">Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                name="assignmentDescription"
                onChange={changeHandler}
                value={assignmentDescription}
                rows={3}
              />
            </Form.Group>
            <div className="text-danger">{assignmentDescriptionError}</div>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="assignmentDescription">
            <div className="d-inline-flex">
              <Form.Label className="my-1">Start Date/Time<span className="text-danger  required-text">*</span></Form.Label>
              </div>
              <DatePicker
                showTimeSelect
                selected={startTime}
                timeIntervals={15}
                className={
                  startTimeError.length > 0
                    ? "form-control  is-invalid"
                    : "form-control "
                }
                name="startTime"
                timeCaption="Time"
                onChange={(date) => {
                  setStartTime(date);
                  setStartTimeError("");
                }}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Please select start time"
              />
              <div className="text-danger">{startTimeError}</div>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="assignmentDescription">
            <div className="d-inline-flex">
              <Form.Label className="my-1">End Date/Time<span className="text-danger  required-text">*</span></Form.Label>
              </div>
              <DatePicker
                showTimeSelect
                selected={endTime}
                onChange={(date) => {
                  setEndTime(date);
                  setEndTimeError("");
                }}
                timeIntervals={15}
                className={
                  endTimeError.length > 0
                    ? "form-control  is-invalid"
                    : "form-control "
                }
                name="endTime"
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Please select end time"
              />
              <div className="text-danger">{endTimeError}</div>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="learningOutcomes">
            <div className="d-inline-flex">
              <Form.Label className="my-1">Select Courses<span className="text-danger  required-text">*</span></Form.Label>
              </div>
              <Select
                value={selectedCourses}
                onChange={handleSelectCourses}
                className={
                  selectedCoursesError.length > 0
                    ? "form-control  is-invalid"
                    : " "
                }
                options={allCourses.map((usr) => ({
                  value: usr.id,
                  label: usr.CourseName,
                }))}
                // options={[{
                //   value: "ba735fe5-0cbd-4e95-b7ab-992f0a2c31a0", label: "Umar"
                // }]}
                //isClearable
                //isMulti
              />
            </Form.Group>
            <div className="text-danger">{selectedCoursesError}</div>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="learningOutcomes">
            <div className="d-inline-flex">
              <Form.Label className="my-1">Select Course Timing<span className="text-danger  required-text">*</span></Form.Label>
              </div>
              <Select
                value={assignmentTimings}
                onChange={handleTimingSelect}
                className={
                  assignmentTimingsError.length > 0
                    ? "form-control  is-invalid"
                    : " "
                }
                //options={courseTimings}
                options={
                  courseTimings !== null || courseTimings.length > 0
                    ? courseTimings.map((c) => ({ value: c, label: c }))
                    : []
                }
                //menuIsOpen={true}
                isClearable
                isMulti
              />
            </Form.Group>
            <div className="text-danger">{assignmentTimingsError}</div>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="learningOutcomes">
            <div className="d-inline-flex">
              <Form.Label className="my-1">Select Course Student<span className="text-danger  required-text">*</span></Form.Label>
              </div>
              <Select
                value={selectedStudents}
                onChange={handleSelectStudent}
                className={
                  assignmentTimingsError.length > 0
                    ? "form-control  is-invalid"
                    : " "
                }
                //options={courseTimings}
                options={
                  allCourseStudents !== null
                    ? allCourseStudents.map((c) => ({
                        value: c.id,
                        label: c.Firstname,
                      }))
                    : []
                }
                //menuIsOpen={true}
                isClearable
                isMulti
              />
            </Form.Group>
            <div className="text-danger">{assignmentTimingsError}</div>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="totalMarks">
              <Form.Label className="my-1">Enter Total Points</Form.Label>
              <Form.Control
                as="input"
                type="tel"
                pattern="[0-9]*"
                name="totalMarks"
                onChange={changeHandler}
                maxLength={5}
                //type="number"
                value={totalMarks}
              />
            </Form.Group>
            <div>{totalMarksError}</div>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="assignmentDescription">
              <Form.Label className="my-1">Attatchments</Form.Label>
              <FilePicker data={multiFiles} afterUpload={afterMultiUpload} /> 
            </Form.Group>
            {/* <div className="text-danger">{assignmentDescriptionError}</div> */}
          </Row>
        </Modal.Body>

        <Modal.Footer>
         
          <Button className="ms-3" type="button" onClick={handleSubmit}>
            {props.formType === 1 ? "Save" : "Save"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default AssignmentModal;
