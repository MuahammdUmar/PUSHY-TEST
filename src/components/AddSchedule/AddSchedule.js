import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {
  CREATE_COURSE_SCHEDULE,
  DELETE_COURSE_SCHEDULE,
  GET_ALL_USERS,
  GET_SCHEDULE_BY_ID_COURSE,
  GET_TUTORS_BY_COURSE,
  UPDATE_COURSE_SCHEDULE,
} from "../../shared/constants";
import { useToasts } from "react-toast-notifications";
import "./AddSchedule.css";
import Select from "react-select";
import { setHours, setMinutes } from "date-fns";
import Control from "../Control";
import DetailListTutorLeaves from '../ListTutLeaves/ListTutorLeaves'

const AddSchedule = (props) => {
  const {
    show,
    courseId,
    onHide,
    scheduleId,
    clickedEventData,
    selCourseTimings,
  } = props;
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  //const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [startTimeError, setStartTimeError] = useState("");
  const [endTime, setEndTime] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [allTutors, setAllTutors] = useState([]);

  const [courseTimings, setCourseTimings] = useState("");
  const [courseTimingsError, setCourseTimingsError] = useState("");

  const [selectedTutors, setSelectedTutors] = useState("");
  const [selectedTutorsError, setSelectedTutorsError] = useState("");

  const [eventTitleError, setEventTitleError] = useState("");
  const [eventDescriptionError, setEventDescriptionError] = useState("");
  const [startDateError, setStartDateError] = useState("");

  const [endTimeError, setEndTimeError] = useState("");
  const [selectedCoursesError, setSelectedCoursesError] = useState("");

  const [timingCount, setTimingCount] = useState(0);
  const [allFilteredTimes, setAllFilteredTimes] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState(false);
  const [openLeaveListModal, setOpenLeaveListModal] = useState(false)
  const [pages, setPages] = useState(0)

  const { addToast } = useToasts();
  //const [endDateError, setEndDateError] = useState('')

  const modalLoaded = () => { };

  const {
    loading: loadingScheduleDet,
    error: errorScheduleDet,
    data: dataScheduleDet,
  } = useQuery(GET_SCHEDULE_BY_ID_COURSE, {
    variables: {
      scheduleId: props && props.scheduleId,
      courseId: props && props.courseId,
    },
    skip: scheduleId === 0,
    onCompleted: (alldata) => { },
    onError: () => {
      //Do nothing
    },
  });
  const [
    createCourseSchedule,
    { loading: loadingUpdate, data: dataUpdate, error: errorUpdate },
  ] = useMutation(CREATE_COURSE_SCHEDULE, {
    onCompleted: () => {
      addToast("Course Schedule saved Successfully", { appearance: "success" });
      //window.location.reload()
      props.onSubmit();
      props.onHide();
    },
    variables: {
      updateCourseInput: {
        Title: eventTitle,
        Description: eventDescription,
        //SchedulerDate: startDate,
        SchedulerStartTime: startTime,
        SchedulerEndTime: endTime,
        CourseTime: courseTimings.value,
        Tutor: selectedTutors.value,
        //Tutor: selectedTutors
      },
      id: props && props.courseId,
    },

    onError: () => {
      //Do nothing
    },
  });

  const [updateCourseSchedule, { loading: loadingSchUpdate, data: dataSchUpdate, error: errorSchUpdate }] = useMutation(UPDATE_COURSE_SCHEDULE, {
    onCompleted: () => {
      addToast("Course schedule saved Successfully", { appearance: "success" });
      //window.location.reload()
      props.onSubmit();
      props.onHide();
    },
    variables: {
      updateCourseInput: {
        Title: eventTitle,
        Description: eventDescription,
        //SchedulerDate: startDate,
        SchedulerStartTime: startTime,
        SchedulerEndTime: endTime,
        CourseTime: courseTimings.value,
        Tutor: selectedTutors.value,
      },
      courseId: props && props.courseId,
      schdulerId: props && props.scheduleId,
    },

    onError: () => {
      //Do nothing
    },
  });

  const {
    loading: loadingUsers,
    data: dataUsers,
    error: errorUsers,
  } = useQuery(GET_TUTORS_BY_COURSE, {
    variables: {
      courseId: props && props.courseId,
    },
    //skip: props.formType === 1,
    onCompleted: () => { },
    onError: () => { },
  });
  // const { loading:loadingUsers, data:dataUsers, error: errorUsers } = useQuery(GET_ALL_USERS)
  const [
    deleteCourseScheduler,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_COURSE_SCHEDULE, {
    onError: () => {
      //setDeleteDialogOpen(false)
    },
    variables: {
      schdulerId: scheduleId,
      courseId: courseId,
    },
    onCompleted: () => {
      addToast("Course Deleted Successfully", { appearance: "success" });
      props.onSubmit();
      props.onHide();
    },
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "eventTitle") {
      setEventTitle(value);
      setEventTitleError("");
    } else if (name === "eventDescription") {
      setEventDescription(value);
      setEventDescriptionError("");
    }
  };
  const submitHandler = () => {
    let pErr = false;
    if (eventTitle === "") {
      setEventTitleError("Please enter event title");
      pErr = true;
    }
    // if (eventDescription === '') {
    //     setEventDescriptionError('Please enter event description')
    //     pErr = true
    // }
    // if (startDate === null) {
    //     setStartDateError('Please enter start date')
    //     pErr = true
    // }
    if (courseTimings === "") {
      setCourseTimingsError("Please Select Courses");
      pErr = true;
    }
    if (selectedTutors.length === 0) {
      setSelectedTutorsError("Please Select Tutor");
      pErr = true;
    }
    if (startTime === null) {
      setStartTimeError("Please enter start time");
      pErr = true;
    }
    if (endTime === null) {
      setEndTimeError("Please enter end time");
      pErr = true;
    }

    if (!pErr && scheduleId === 0) {
      createCourseSchedule();
    }
    if (!pErr && scheduleId) {
      updateCourseSchedule();
    }
  };

  useEffect(() => {
    if (dataUsers) {
      //let dataTutors = dataUsers.getAllUserss.filter(usr => usr.roles === 3)
      //setAllTutors(dataTutors)
      //console.log('clickedEventData', clickedEventData)
      // if (scheduleId && clickedEventData.Tutor !== null) {
      //   const tutoSel = dataUsers.getAllUserByCourseId.length > 0 && dataUsers.getAllUserByCourseId.filter(usr => usr.id === clickedEventData && clickedEventData.Tutor)
      //   tutoSel.length > 0 && setSelectedTutors({ value: tutoSel[0].id, label: tutoSel[0].Firstname })
      // }
      //console.log('dataUsers.getAllUserByCourseId', dataUsers.getAllUserByCourseId)
      setAllTutors(dataUsers.getAllUserByCourseId);
    }
  }, [dataUsers]);

  useEffect(() => {
    if (dataScheduleDet) {
      console.log("dataScheduleDet.getSchedulerById", dataScheduleDet.getSchedulerById);
      setEventTitle(dataScheduleDet.getSchedulerById.Title);
      setEventDescription(dataScheduleDet.getSchedulerById.Description);
      //setStartDate(clickedEventData.SchedulerDate && new Date(clickedEventData.SchedulerDate))
      setStartTime(
        new Date(dataScheduleDet.getSchedulerById.SchedulerStartTime)
      );
      setEndTime(new Date(dataScheduleDet.getSchedulerById.SchedulerEndTime));
      if (dataScheduleDet.getSchedulerById.CourseTime !== null) {
        handleTimingSelect({
          value: dataScheduleDet.getSchedulerById.CourseTime,
          label: dataScheduleDet.getSchedulerById.CourseTime,
        });
      }
      console.log('dataScheduleDet.getSchedulerById.Tutor', dataScheduleDet.getSchedulerById.Tutor)
      setSelectedTutors({value:dataScheduleDet.getSchedulerById.Tutor && dataScheduleDet.getSchedulerById.Tutor.id,
        label:dataScheduleDet.getSchedulerById.Tutor && dataScheduleDet.getSchedulerById.Tutor.Firstname,
      });
      setLeaveStatus(dataScheduleDet.getSchedulerById.AppliedForLeave);
    }
  }, [dataScheduleDet]);

  const handleTimingSelect = (selopt) => {
    const value = selopt === null ? "" : selopt;
    setCourseTimings(value);
    const counterVal =
      selopt.value === "MORNING"
        ? 8
        : selopt.value === "NOON"
          ? 12
          : selopt.value === "EVENING"
            ? 18
            : 0;
    setTimingCount(counterVal);
    filteredTimes(counterVal);
    setCourseTimingsError("");
  };
  const handleSelectTutors = (selecopt) => {
    const value = selecopt === null ? "" : selecopt;
    setSelectedTutors(value);
    setSelectedTutorsError("");
  };
  const delCourseSchedule = () => {
    deleteCourseScheduler();
  };

  const filteredTimes = (vale) => {
    let allDatesArr = [];
    let numberArr = [0, 1, 2, 3, 4];
    numberArr.forEach((v) => {
      allDatesArr.push(
        setHours(setMinutes(new Date(), 0), vale + v),
        setHours(setMinutes(new Date(), 30), vale + v)
      );
    });
    setAllFilteredTimes(allDatesArr);
  };

  const onClickSearchIcon = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //console.log("emogji clicked");
    setOpenLeaveListModal(true)
  };

  const tutorLeaveApproval = () => {
    setPages(pages + 1)
  }
  // if (loadingScheduleDet) return <div>Loading......</div>;
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
      {pages === 0 && 
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {scheduleId ? "Edit Schedule" : "Add Schedule"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 my-1">
              <div className="d-inline-flex">
                <label className="form-label">
                  Course Title
                  <span className="text-danger required-text">*</span>
                </label>
              </div>
              <input
                type="text"
                name="eventTitle"
                placeholder="Course Title"
                className={
                  eventTitleError.length > 0
                    ? "form-control  is-invalid"
                    : "form-control "
                }
                maxLength={"50"}
                onChange={changeHandler}
                value={eventTitle}
              />
              <div className="text-danger">{eventTitleError}</div>
            </div>
            <div className="col-12 my-1">
              <label className="form-label">
                Course Description
                <span className="text-danger required-text"></span>
              </label>

              <input
                type="text"
                name="eventDescription"
                placeholder="Course Description"
                className="form-control"
                maxLength={"300"}
                onChange={changeHandler}
                value={eventDescription}
              />
              <div className="text-danger">{eventDescriptionError}</div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 my-1">
              <div className="d-inline-flex">
                <label className="form-label">
                  Course Timing
                  <span className="text-danger required-text">*</span>
                </label>
              </div>
              <Select
                value={courseTimings}
                onChange={handleTimingSelect}
                className={
                  courseTimingsError.length > 0
                    ? "form-control  is-invalid"
                    : " "
                }
                options={selCourseTimings.map((timing) => ({
                  value: timing.toUpperCase(),
                  label: timing.toUpperCase(),
                }))}
                //menuIsOpen={true}
                isClearable
              />
              <div className="text-danger">{courseTimingsError}</div>
            </div>
            <div className="col-12 my-1">
              <div className="d-inline-flex">
                <label className="form-label">
                  Start Time<span className="text-danger required-text">*</span>
                </label>
              </div>

              <DatePicker
                showTimeSelect
                selected={startTime}
                //timeIntervals={15}
                className={
                  startTimeError.length > 0
                    ? "form-control  is-invalid"
                    : "form-control "
                }
                disabled={!courseTimings}
                timeCaption="Time"
                onChange={(date) => setStartTime(date)}
                includeTimes={allFilteredTimes}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Start Time"
              />
              <div className="text-danger">{startTimeError}</div>
            </div>
            <div className="col-12 my-1">
              <div className="d-inline-flex">
                <label className="form-label">
                  End Time<span className="text-danger required-text">*</span>
                </label>
              </div>

              <DatePicker
                showTimeSelect
                selected={endTime}
                onChange={(date) => {
                  setEndTime(date);
                  console.log("end data", date);
                }}
                //timeIntervals={30}
                className={
                  endTimeError.length > 0
                    ? "form-control  is-invalid"
                    : "form-control "
                }
                includeTimes={allFilteredTimes}
                //includeTimes={[0, 1, 2, 3, 4].map((v) => setHours(setMinutes(new Date(), 0), timingCount + v + 1))}
                disabled={!courseTimings}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="End Time"
              />
              <div className="text-danger">{endTimeError}</div>
            </div>
            {/* Tutors multiselect */}

            {/* Course Schedule Multiselect */}
            <div className="col-12 my-1">
              <div className="d-inline-flex">
                <label className="form-label">
                  Tutor<span className="text-danger required-text">*</span>
                </label>
              </div>
              {/* <Select
              value={selectedTutors}
              onChange={handleSelectTutors}
              className={
                selectedTutorsError.length > 0
                  ? "form-control  is-invalid"
                  : " "
              }
              options={allTutors.map((usr) => ({ value: usr.id, label: usr.Firstname }))}
              isClearable
            /> */}
              <Select
                {...props}
                value={selectedTutors}
                onChange={handleSelectTutors}
                options={allTutors.map((usr) => ({
                  value: usr.id,
                  label: usr.Firstname,
                }))}
                isClearable
                name="emojis"
                components={{ Control }}
                onSearchIconClick={onClickSearchIcon}
              />
              <div className="text-danger">{selectedTutorsError}</div>
            </div>
            <div className="col-12 my-1">
              <Button onClick={tutorLeaveApproval} disabled={selectedTutors.value === null}>Tutor Leave Approval</Button>
              {selectedTutors.value === null && <div className="text-danger">No Tutor is attatched to this course till now</div>}
            </div>    
           
          </div>
          {loadingScheduleDet && (
            <div className="loading-indicator">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {scheduleId ? (
            <Button variant="danger" onClick={delCourseSchedule}>
              Delete
            </Button>
          ) : (
            ""
          )}
          <Button variant="success" onClick={submitHandler}>
            {scheduleId ? "Edit" : "Add"} Schedule
          </Button>
          <Button onClick={() => onHide()}>Cancel</Button>
        </Modal.Footer>
      </>}
      

      {pages === 1 && (
        <DetailListTutorLeaves
          //show={openLeaveListModal}
          scheduleId={scheduleId}
          tutorId={selectedTutors.value}
          onBack={() => setPages(pages-1)}
          //onHide={() => setOpenLeaveListModal(false)}
        />
      )}
    </Modal>
  );
};
export default AddSchedule;
