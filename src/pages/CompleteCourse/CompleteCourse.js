import React from "react";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  ENROLL_COURSE,
  RATE_COURSE,
  GET_COURSE_BY_ID_WITH_TIME,
  GET_STUDENT_RATING,
} from "../../shared/constants";
import { useToasts } from "react-toast-notifications";
import { Rating } from "react-simple-star-rating";
import { Button, Form, Spinner } from "react-bootstrap";
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
  const [ratingData, setRatingData] = useState();
  const [reviewText, setReviewText] = useState("");
  const [reviewTextError, setReviewTextError] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState("");
  const [allCourseTimings, setAllCourseTimings] = useState([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [scheduleClickedEvent, setScheduleClickedEvent] = useState({});
  const [scheduleId, setScheduleId] = useState(0);
  const [averageRating, setAverageRating] = useState(0)

  const [selectTiming, setSelectTiming] = useState({});
  const [selectTimingError, setSelectTimingError] = useState("");

  const { addToast } = useToasts();

  const { loading, data, refetch } = useQuery(GET_COURSE_BY_ID_WITH_TIME, {
    variables: { id: courseId },
  });

  const { data: dataRatings, refetch: refetchRatings } = useQuery(
    GET_STUDENT_RATING,
    {
      variables: { id: courseId },
      skip: !user || user.roles !== 1,
    }
  );

  const [enrollCourse, { loading: loadingEnroll }] = useMutation(
    ENROLL_COURSE,
    {
      variables: { courseId: courseId, courseTime: selectTiming.value },
      //skip: false,
      onCompleted: (payementpend) => {
        //addToast("Course enrolled successfully", { appearance: "success" });
        //refetch();

        if (payementpend) {
          props.history.push({
            pathname: "/paymentpage",
            state: { courseId: courseId },
          });
        }
      },
      onError: () => {
        //Do nothing
      },
      refetchQueries: [
        { query: GET_COURSE_BY_ID_WITH_TIME, variables: { id: courseId } },
      ],
      awaitRefetchQueries: true,
    }
  );

  const [rateCourse] = useMutation(RATE_COURSE, {
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
      refetchRatings();
      setRating(0);
      setReviewText("");
    },
    onError: () => {
      //Do nothing
    },
  });

  const enrollCourseFunc = async () => {
    let pErr = false;
    if (Object.keys(selectTiming).length === 0) {
      setSelectTimingError("Please select timing first");
      pErr = true;
    }
    if (!pErr) {
      await enrollCourse();
    }
  };

  const handleRating = (rate) => {
    setRating(rate / 20);
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
      console.log("data.getCourseByIdWithTime", data.getCourseByIdWithTime);
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

      //calculateAverageRating(data.getCourseByIdWithTime.CourseRatings)
      setCourseData(data.getCourseByIdWithTime);
    }
    if (dataRatings) {
      setRatingData(dataRatings.getStudentRatings);
    }
  }, [data, dataRatings]);

  const handleSelect = (selecopt) => {
    const value = selecopt === null ? "" : selecopt;
    setSelectTiming(value);
    setSelectTimingError("");
  };

  const calculateAverageRating = (ratingArr) => {
    let averageRating = ratingArr.reduce((prevItem, nextItem) => { return prevItem + nextItem.Rating; }, 0) / ratingArr.length
    setAverageRating(averageRating.toFixed(1))
    //return averageRating.toFixed(1)
  }

  const handleEventClick = (eventinfo) => {
    setScheduleId(eventinfo.event._def.publicId);
    setDetailModalOpen(true);
  }

  const loadingIndicator = loadingEnroll || loading;

  return (
    <>
      <Header />
      <div className="coursenav p-5">
        <div className="container">
          <div className="row">
            <div className="col text-white">
              <h3 className="mb-3">{courseData && courseData.CourseName}</h3>
              <h6>Credit Hours: <span>{courseData && courseData.CourseCreditHours}</span></h6>
              {/* <h6>{courseData && courseData.CourseRatings.reduce((prevItem, nextItem) => { return prevItem + nextItem.Rating; }, 0)}</h6> */}
              {courseData && courseData.AverageRating &&
                <div>
                  <span>{courseData && courseData.AverageRating}</span>
                  <Rating
                    ratingValue={courseData && courseData.AverageRating ? courseData && courseData.AverageRating : 0}
                    transition
                    size={50}
                    readonly
                  />
                </div>}

              {/* <h5 className="mb-3">by-Alex Costa</h5> */}

              {user &&
                user.roles == 1 &&
                courseData &&
                !courseData.IsCurrentStudentEnrolled && (
                  <>
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={enrollCourseFunc}
                    >
                      Enroll Course
                    </button>
                  </>
                )}
            </div>


            <div className="col-sm-auto text-white text-end">
              <h3 className="pay_rate text-black">
                <b>${courseData && courseData.Price}</b>
              </h3>
              {((courseData && courseData.IsPaymentPending) ||
                (courseData && courseData.IsPaymentPending === null)) && (
                  <Link
                    className="btn btn-lg buy_now"
                    to={{
                      pathname: `/paymentpage`,
                      //state: { finalUserId: (user && user.id) }
                      state: { courseId: courseId },
                    }}
                  >
                    Buy
                  </Link>)}
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
              {user &&
                user.roles == 1 &&
                courseData &&
                !courseData.IsCurrentStudentEnrolled && (
                  <Select
                    className="mb-3"
                    value={selectTiming}
                    onChange={handleSelect}
                    options={allCourseTimings}
                    isClearable
                  />
                )}
              <div className="text-danger">{selectTimingError}</div>
              {courseData && courseData.EnrolledCourseTime === "MORNING" && (
                <span class="morning-time">
                  {courseData && courseData.EnrolledCourseTime}
                </span>
              )}
              {courseData && courseData.EnrolledCourseTime === "NOON" && (
                <span class="noon-time">
                  {courseData && courseData.EnrolledCourseTime}
                </span>
              )}
              {courseData && courseData.EnrolledCourseTime === "EVENING" && (
                <span class="evening-time">
                  {courseData && courseData.EnrolledCourseTime}
                </span>
              )}
            </div>

            <hr className="line mt-0" />
            <div className="inner-heading">
              <h4>Payement Status</h4>
            </div>

            <div className="course-timing">
              {(courseData && courseData.IsPaymentPending) ||
                (courseData && courseData.IsPaymentPending === null) ? (
                <span class="noon-time">Pending</span>
              ) : (
                <span class="morning-time">Paid</span>
              )}
            </div>
            <hr className="line mt-0" />
            <div className="inner-heading">
              <h4>Learning Outcomes</h4>
            </div>

            <div className="outcomes course-card">
              <p>{courseData && courseData.CourseOutcomes}</p>
            </div>

            <hr className="line" />
          </div>

          <div className="col-sm-9">
            <div className="inner-heading">
              <h4>Course Description</h4>
            </div>

            <div className="lecture-panel">
              <p>{courseData && courseData.CourseDescription}</p>

              <div className="button-panel mb-3">
                {/* <button className="btn stu_button text-white">
                  Student Guide
                </button> */}
                <button className="btn btn-dark">Course Outline</button>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="course-calendar">
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    className="course-calendar"
                    events={
                      user && user.roles === 1
                        ? courseData &&
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
                    eventClick={(evinfo) => handleEventClick(evinfo)}
                  />
                </div>
              </div>
            </div>

            {user && user.roles === 1 && (
              <div className="review-panel">
                <div className="inner-heading">
                  <h4>Student Feedback</h4>
                </div>

                {ratingData &&
                  ratingData.map((rating) => {
                    return (
                      <div className="feedback">
                        <div className="card-tital mb-2 h5">
                          {rating.StudentName}
                        </div>
                        <div className="rating">
                          <Rating ratingValue={rating.Rating * 20} />
                        </div>
                        <div className="feedback-body p">{rating.Comment}</div>
                      </div>
                    );
                  })}

                <div className="feedback">
                  <Form.Group controlId="formBasicEmail">
                    <h5 className="card-tital mb-2 h5 w-100">Review</h5>
                    <Rating
                      onClick={handleRating}
                      ratingValue={rating}
                      fullIcon=""
                    />
                    <div className="row">
                      <div className="col-8">
                        <Form.Control
                          type="review"
                          placeholder="Enter Review"
                          onChange={(e) => {
                            setReviewText(e.target.value);
                            setReviewTextError("");
                          }}
                          value={reviewText}
                        />
                      </div>
                    </div>
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
              </div>
            )}
          </div>
        </div>

        {loadingIndicator && (
          <div className="loading-indicator">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
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

export default CompleteCourse;
