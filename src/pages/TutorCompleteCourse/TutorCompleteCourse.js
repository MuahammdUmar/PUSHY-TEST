import React from "react";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ENROLL_COURSE,
  GET_COURSE_BY_ROLE,
  RATE_COURSE,
  GET_COURSE_BY_ID_WITH_TIME,
  GET_COURSETIME_BY_ID,
  GET_ALL_STUDENTS_CURRENT_TUTOR,
} from "../../shared/constants";
import { useToasts } from "react-toast-notifications";
import { Rating } from "react-simple-star-rating";
import { Badge, Button, Form, ListGroup, Spinner } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "../Header/Header";
import Select from "react-select";
import DetailModal from "../../components/DetailModal/DetailModal";
import "./TutorCompleteCourse.css";

const TutorCompleteCourse = (props) => {
  const { courseId } = props.history.location.state;
  const user = JSON.parse(localStorage.getItem("user"));
  const [courseData, setCourseData] = useState();
  const [reviewText, setReviewText] = useState("");
  const [reviewTextError, setReviewTextError] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState("");
  const [allCourseTimings, setAllCourseTimings] = useState([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [scheduleId, setScheduleId] = useState(0);
  const [scheduleClickedEvent, setScheduleClickedEvent] = useState({});
  const [allTutorStudents, setAllTutorStudents] = useState([]);

  const [selectTiming, setSelectTiming] = useState([]);

  const { addToast } = useToasts();

  const {
    loading: loadingTutStu,
    data: dataTutStu,
    error: errorTutStu,
  } = useQuery(GET_ALL_STUDENTS_CURRENT_TUTOR, {
    onCompleted: () => {},
    onError: () => {},
  });

  const { loading, error, data } = useQuery(GET_COURSE_BY_ID_WITH_TIME, {
    variables: { id: courseId },
    //skip: false,
    onCompleted: (alldata) => {},
    onError: () => {
      //Do nothing
    },
  });

  const { loading: loadingCourseTimings,
    error: errorCourseTimings,
    data: dataCourseTimings,
  } = useQuery(GET_COURSETIME_BY_ID, {
    variables: { courseId: courseId },
    skip: true,
    onCompleted: () => {},
    onError: () => {
      //Do nothing
    },
  });

  const [
    enrollCourse,
    { loading: loadingEnroll, error: errorEnroll, data: dataEnroll },
  ] = useMutation(ENROLL_COURSE, {
    variables: { courseId: courseId, courseTime: selectTiming.value },

    //skip: false,
    onCompleted: (alldata) => {
      addToast("Course enrolled successfully", { appearance: "success" });
    },
    onError: () => {
      //Do nothing
    },
    refetchQueries: [{ query: GET_COURSE_BY_ROLE }],
    awaitRefetchQueries: true,
  });

  const [
    rateCourse,
    { loading: loadingRate, error: errorRate, data: dataRate },
  ] = useMutation(RATE_COURSE, {
    variables: {
      id: courseId,
      courseRatingInput: {
        Rating: rating,
        Comment: reviewText,
      },
    },
    //skip: false,
    onCompleted: (alldata) => {
      addToast("Course rated successfully", { appearance: "success" });
    },
    onError: () => {
      //Do nothing
    },
  });

  const enrollCourseFunc = async () => {
    await enrollCourse();
  };
  const handleRating = (rate) => {
    let drink = getDrink(rate);
    setRating(drink);
    setRatingError("");
  };
  const submitRating = () => {
    let pErr = false;
    if (reviewText === "") {
      setReviewTextError("Please add review");
      pErr = true;
    }
    if (rating === 0) {
      setRatingError("Please add rating");
      pErr = true;
    }
    if (!pErr) {
      rateCourse();
    }
  };

  useEffect(() => {
    if (data) {
      if (data.getCourseByIdWithTime.CourseTime !== null) {
        setAllCourseTimings(
          data.getCourseByIdWithTime.CourseTime.map((timing) => ({
            value: timing,
            label: timing,
          }))
        );
      }
      if (data.getCourseByIdWithTime.EnrolledCourseTime !== null) {
        setSelectTiming({
          value: data.getCourseByIdWithTime.EnrolledCourseTime,
          label: data.getCourseByIdWithTime.EnrolledCourseTime,
        });
      }
      if(data.getCourseByIdWithTime.EnrolledUsers !==null){
        setAllTutorStudents(data.getCourseByIdWithTime.EnrolledUsers)
      }
      console.log('data.getCourseByIdWithTime', data.getCourseByIdWithTime)
      setCourseData(data.getCourseByIdWithTime)
    }
  }, [data, dataCourseTimings]);

  // useEffect(() => {
  //   if (dataTutStu) {
  //     console.log(
  //       "all tutor students",
  //       dataTutStu.getEnrolledStudentsForCurrentUser
  //     );
  //     setAllTutorStudents(dataTutStu.getEnrolledStudentsForCurrentUser);
  //   }
  // }, [dataTutStu]);

  // POOR = 1,
  // FAIR = 2,
  // GOOD = 3,
  // EXCELLENT = 4,
  // WOW = 5,
  const getDrink = (type) => {
    var drinks = {
      20: "POOR",
      40: "FAIR",
      60: "GOOD",
      80: "EXCELLENT",
      100: "WOW",
      default: "GOOD",
    };
    return drinks[type] || drinks["default"];
  };

  const handleSelect = (selecopt) => {
    const value = selecopt === null ? "" : selecopt;
    setSelectTiming(value);
  };
  const renderEventContent = (eventInfo) => {
    // extendedProps: {description: 'Description1'}
    // console.log('eventinfo', eventInfo)
    return (
      <>
        <div>{eventInfo.event.title}</div>
        <div>{eventInfo.timeText}</div>
        <div>{eventInfo.event._def.extendedProps.description}</div>
        <div>{eventInfo.event._def.extendedProps.coursetime}</div>
      </>
    );
  };
const handleEventClick = (eventinfo) => {
  setScheduleId(eventinfo.event._def.publicId);
  setDetailModalOpen(true);
}
  if (loading)
    return (
      <div className="loading-indicator">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row border mb-2 coursenav">
          <div className="col-sm-3 txt_color pb-4 pt-4 fs-5 ">
            <h3>{courseData && courseData.CourseName}</h3>
            <h5>
              <i>by-Alex Costa</i>
            </h5>

            {user &&
              user.roles === 1 &&
              courseData &&
              courseData.IsCurrentStudentEnrolled && (
                <>
                  <Select
                    value={selectTiming}
                    onChange={handleSelect}
                    options={allCourseTimings}
                    //options={allCourseTimings.map((val) => ({ value:val, label: val }))}
                    isClearable
                  />
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={enrollCourseFunc}
                  >
                    Enroll Course
                  </button>
                </>
              )}
          </div>
        </div>
        <div className="row mb-3 ">
          <div className="col-sm-3 lec_heading mt-3 ">
            <div className="inner-heading">
              <h4>Course Timing</h4>
            </div>

            <div className="course-timing">


              {allCourseTimings.map((ti) => {
                return (
                  <span className={`${ti.value.toLowerCase()}-time`}>{ti.value}</span>
                )
              })}

            </div>
            <hr className="line mt-0" />
            <div className="inner-heading">
              <h4>Learning Outcomes</h4>
            </div>

            <div className="outcomes course-card">
              <p>{courseData && courseData.CourseOutcomes}</p>
            </div>

            <hr className="line" />

            <aside className="enrolledUsers">
              <h2>Enrolled Users</h2>
              <ListGroup as="ol" numbered>
                {allTutorStudents.map((stud) => {
                  return (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{stud.Firstname}</div>
                      </div>
                      {/* <Badge variant="primary" pill>
                        14
                      </Badge> */}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </aside>
          </div>
          <div className="col-sm-6 course_head mt-3">
            <div className="row mt-3">
              <h4>Course Description</h4>
              <div>
                <p>{courseData && courseData.CourseDescription}</p>
                <div className="">
                  {/* <button className="btn stu_button text-white">
                    Student Guide
                  </button> */}
                  <button className="btn btn-dark">Course Outline</button>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-body">
                <div className="course-calendar">
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    eventContent={renderEventContent} // custom render function
                    // editable={false}
                    //displayEventEnd={true}
                    events={
                      user && user.roles === 1
                        ? //courseData.CourseScheduler.map((item) => {
                          courseData &&
                          courseData.CourseScheduler !== null &&
                          courseData.CourseScheduler.filter(
                            (cschd) => cschd.CourseTime === selectTiming.value
                          ).map((item) => {
                            return {
                              title: item.Title,
                              start: item.SchedulerStartTime,
                              end: item.SchedulerEndTime,
                              description: item.Description,
                              id: item.ScheduleId,
                            };
                          })
                        : courseData &&
                          courseData.CourseScheduler !== null &&
                          courseData.CourseScheduler.map((item) => {
                            return {
                              title: item.Title,
                              start: item.SchedulerStartTime,
                              end: item.SchedulerEndTime,
                              description: item.Description,
                              id: item.ScheduleId,
                            };
                          })
                    }
                    
                    eventClick={(eventInfo) => handleEventClick(eventInfo)}
                  />
                </div>
              </div>
            </div>
           

            {user && user.roles === 1 && <div className="my-2">
              <h4 className="my-2">Student Feedback</h4>
              <Rating
                onClick={handleRating}
                ratingValue={rating}
              />
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Review</Form.Label>
                <Form.Control type="review" placeholder="Enter Review" onChange={(e) => { setReviewText(e.target.value); setReviewTextError('') }} value={reviewText} />
              </Form.Group>
              <div className="text-danger">{reviewTextError}</div>
              <div className="text-danger">{ratingError}</div>
              <Button variant="primary" type="button" onClick={submitRating}>Submit</Button>
            </div>
            }

            {user && user.roles === 1 && (
              <div className="my-2">
                <h4 className="my-2">Student Feedback</h4>
                <Rating onClick={handleRating} ratingValue={rating} />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    type="review"
                    placeholder="Enter Review"
                    onChange={(e) => {
                      setReviewText(e.target.value);
                      setReviewTextError("");
                    }}
                    value={reviewText}
                  />
                </Form.Group>
                <div className="text-danger">{reviewTextError}</div>
                <div className="text-danger">{ratingError}</div>
                <Button variant="primary" type="button" onClick={submitRating}>
                  Submit
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {detailModalOpen && (
        <DetailModal
          show={detailModalOpen}
          onHide={() => setDetailModalOpen(false)}
          //eventData={scheduleClickedEvent}
          scheduleId={scheduleId}
          courseId={courseId}
        />
      )}
    </>
  );
};

export default TutorCompleteCourse;
