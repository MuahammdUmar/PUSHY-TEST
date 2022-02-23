import React from "react";
import { useState, useEffect } from "react";
import { MdPictureAsPdf } from "react-icons/md";
import { HiOutlineDownload } from "react-icons/hi";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_COURSE_BY_ID,
  ENROLL_COURSE,
  GET_COURSE_BY_ROLE,
  RATE_COURSE,
  GET_COURSE_BY_ID_WITH_TIME,
  GET_COURSETIME_BY_ID,
  GET_ALL_STUDENTS_CURRENT_TUTOR,
  GET_ALL_COURSES,
} from "../../shared/constants";
import { useToasts } from "react-toast-notifications";
import { Rating } from "react-simple-star-rating";
import { Badge, Button, Form, ListGroup, Spinner } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "../Header/Header";
import Select from "react-select";
import DetailModal from "../../components/DetailModal/DetailModal";
import "./CompleteCourse.css";

const CompleteCourse = (props) => {
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

  

  const { loading, error, data } = useQuery(GET_COURSE_BY_ID_WITH_TIME, {
    variables: { id: courseId },
    //skip: false,
    onCompleted: (alldata) => { },
    onError: () => {
      //Do nothing
    },
  });
  
  const { loading: loadingTutStu, data: dataTutStu, error: errorTutStu,} = useQuery(GET_ALL_STUDENTS_CURRENT_TUTOR, {
    onCompleted: () => { },
    onError: () => { },
  });

  
  const { loading: loadingCourseTimings, error: errorCourseTimings, data: dataCourseTimings} = useQuery(GET_COURSETIME_BY_ID, {
    variables: { courseId: courseId },
    skip: true,
    onCompleted: () => { },
    onError: () => {
      //Do nothing
    },
  });

  const [enrollCourse,{ loading: loadingEnroll, error: errorEnroll, data: dataEnroll }] = useMutation(ENROLL_COURSE, {
    variables: { courseId: courseId, courseTime: selectTiming.value },
    //skip: false,
    onCompleted: (alldata) => {
      console.log('dta', alldata)
      addToast("Course enrolled successfully", { appearance: "success" });
    },
    onError: () => {
      //Do nothing
    },
    refetchQueries: [{ query: GET_ALL_COURSES }],
    awaitRefetchQueries: true,
    // refetchQueries: [{ query: GET_COURSE_BY_ID_WITH_TIME, variables: { id: courseId }, }],
    // awaitRefetchQueries: true,
  });

  const [rateCourse,{ loading: loadingRate, error: errorRate, data: dataRate }] = useMutation(RATE_COURSE, {
    variables: { id: courseId,
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

      console.log("course timingsssss", data.getCourseByIdWithTime);
      setCourseData(data.getCourseByIdWithTime);
    }

    if (dataTutStu) {
      setAllTutorStudents(dataTutStu.getEnrolledStudentsForCurrentUser);
    }
  }, [data, dataCourseTimings, dataTutStu]);
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


  const loadingIndicator = loadingCourseTimings || loadingEnroll

  return (
    <>
      <Header />
      <div className="coursenav">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 text-white p-4">
              <h3 className="mb-3">{courseData && courseData.CourseName}</h3>

              <h5 className="mb-3">by-Alex Costa</h5>

              {courseData && !courseData.IsCurrentStudentEnrolled && (
                <>
                  <Select
                    className="mb-3"
                    value={selectTiming}
                    onChange={handleSelect}
                    //onChange={(selop) =>  setSelectTiming(selop) }
                    // options={[
                    //   { value: 'MORNING', label: 'Morning' },
                    //   { value: 'NOON', label: 'Noon' },
                    //   { value: 'EVENING', label: 'Evening' },
                    // ]}
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
        </div>
      </div>

      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-3">
            <div className="inner-heading">
              <h4>Course Timing</h4>
            </div>

            <div className="course-timing">
              {/* <span class="morning-time">Morning</span>
              <span class="noon-time">Noon</span>
              <span class="evening-time">Evening</span>  */}


              {courseData && courseData.EnrolledCourseTime === "MORNING" &&
                <span class="morning-time">{courseData && courseData.EnrolledCourseTime}</span>
              }
              {courseData && courseData.EnrolledCourseTime === "NOON" &&
                <span class="noon-time">{courseData && courseData.EnrolledCourseTime}</span>
              }
              {courseData && courseData.EnrolledCourseTime === "EVENING" &&
                <span class="evening-time">{courseData && courseData.EnrolledCourseTime}</span>
              }
              {/* <span>{courseData && courseData.EnrolledCourseTime}</span> */}
            </div>

            <hr className="line mt-0" />

            <div className="inner-heading">
              <h4>Learning Outcomes</h4>
            </div>

            <div className="outcomes course-card">
              <p>{courseData && courseData.CourseOutcomes}</p>
            </div>

            <hr className="line" />

            {/* <aside className="enrolledUsers">
              <div className="inner-heading">
                <h4>Enrolled Users</h4>
              </div>

              <ListGroup as="ol" numbered>
                {allTutorStudents.map((stud) => {
                  return (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{stud.Firstname}</div>
                        Cras justo odio
                      </div>
                      <Badge variant="primary" pill>
                        14
                      </Badge>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </aside> */}
          </div>

          <div className="col-sm-9">
            <div className="inner-heading">
              <h4>Course Description</h4>
            </div>

            <div className="lecture-panel">
              <p>{courseData && courseData.CourseDescription}</p>

              <div className="button-panel mb-3">
                <button className="btn stu_button text-white">
                  Student Guide
                </button>
                <button className="btn btn-dark ms-3">Course Outline</button>
              </div>
            </div>

            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
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
              eventClick={(eventInfo) => {
                let clickedEvent = [];
                setScheduleId(eventInfo.event._def.publicId);
                if (data.getCourseByIdWithTime.CourseScheduler !== null) {
                  clickedEvent =
                    data.getCourseByIdWithTime.CourseScheduler.filter(
                      (eve) => eve.ScheduleId === eventInfo.event._def.publicId
                    );
                }
                let eventData = clickedEvent[0];
                eventData = {
                  ...eventData,
                  CourseName: courseData && courseData.CourseName,
                };
                console.log("event", eventData);
                setScheduleClickedEvent(eventData);
                setDetailModalOpen(true);
              }}
            // events={[
            //   { title: 'event 1', start: '2022-01-11T06:19:00.639Z', end: '2022-01-11T06:32:13.046Z', id: 'kjkjkjkjlkjkljkjl' },
            //   { title: 'event 2', date: '2022-01-11T06:19:00.639Z' }
            // ]}
            />

            {user && user.roles === 1 && (
              <div className="review-panel">
                <div className="inner-heading">
                  <h4>Student Feedback</h4>
                </div>

                <Rating onClick={handleRating} ratingValue={rating} />

                <Form.Group className="feedback" controlId="formBasicEmail">
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

                <Button
                  className="btn stu_button text-white border-0"
                  type="button"
                  onClick={submitRating}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
         
        </div>
        { loadingIndicator &&
          <div className="loading-indicator">
            <Spinner animation="border" variant="primary" />
          </div>
        }
      </div>

      {detailModalOpen && (
        <DetailModal
          show={detailModalOpen}
          onHide={() => setDetailModalOpen(false)}
          eventData={scheduleClickedEvent}
        />
      )}
    </>
  );
};

export default CompleteCourse;
