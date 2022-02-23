import React, { useCallback, useEffect, useState } from "react";
import "./CourseSchedule.css";
import Header from "../Header/Header";
import { Form, Spinner } from "react-bootstrap";
import AddSchedule from "../../components/AddSchedule/AddSchedule";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  GET_ALL_COURSES,
  GET_ALL_USERS,
  GET_COURSE_BY_ID,
} from "../../shared/constants";
import { useQuery } from "@apollo/client";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CourseSchedule = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [selectCourse, setSelectCourse] = useState("");
  const [scheduleId, setScheduleId] = useState(0);
  const [scheduleClickedEvent, setScheduleClickedEvent] = useState({});
  const [selectedCourseTimings, setSelectedCourseTimings] = useState([]);
  const [calenderEvents, setCalenderEvents] = useState([]);
  const [courseName,setCourseName] = useState('')

  const {
    loading: loadingCourses,
    data: dataCourses,
    error: errorCourse,
  } = useQuery(GET_ALL_COURSES);

  // const { loading:loadingUsers, data:dataUsers, error: errorUsers } = useQuery(GET_ALL_USERS)

  const {
    loading: loadingCourseById,
    data: dataCourseById,
    error: errorCourseById,
    refetch,
  } = useQuery(GET_COURSE_BY_ID, {
    variables: { id: selectCourse },
    skip: selectCourse === "",
    onError: () => {
      //props.onHide()
    },
  });

  useEffect(() => {
    if (dataCourses) {
      setAllCourses(dataCourses.getAllCourses);
    }
  }, [dataCourses]);

  useEffect(() => {
    if (dataCourseById) {
      console.log("coursebyid", dataCourseById.getCourseById);
      if (dataCourseById.getCourseById.CourseTime !== null) {
        setSelectedCourseTimings(dataCourseById.getCourseById.CourseTime);
      }
      setCourseName(dataCourseById.getCourseById.CourseName)


      if (dataCourseById.getCourseById.CourseScheduler !== null) {
        console.log("dataCourseById.getCourseById.CourseScheduler", dataCourseById.getCourseById.CourseScheduler
        );
       
        setCalenderEvents(dataCourseById.getCourseById.CourseScheduler)
        //setCalenderEvents(NewArray);
      }
      if (dataCourseById.getCourseById.CourseScheduler === null) {
        setCalenderEvents([]);
      }
    }
  }, [dataCourseById]);

  const selecCourse = (e) => {
    const { value } = e.target;
    setSelectCourse(value);
    setScheduleId(0);
  };
  const fetchDataOnSubmit = useCallback(() => {
    refetch();
  }, []);

  const renderEventContent = (eventInfo) => {
    // extendedProps: {description: 'Description1'}
    // console.log('eventInfo', eventInfo)
    return (
      <>
        <div className="d-flex justify-content-between">{eventInfo.event.title}
        {eventInfo.event._def.extendedProps.leavestatus ? <span className="btn btn-xs btn-danger text-white"></span> : <span className="btn btn-xs btn-success text-white"></span>}
        </div>
        <div>{eventInfo.timeText}</div>
        <div>{eventInfo.event._def.extendedProps.description}</div>
        <div>{eventInfo.event._def.extendedProps.coursetime}</div>
     
      </>
    );
  };
  const calenderHandleClick = (eventinfo) => {
    setScheduleId(eventinfo.event._def.publicId);
    setShowModal(true);
  }
  return (
    <>
      <div className="adminbdcolor">
        {/* <Header  userId={userId} userRoll={2} /> */}
        <Header />
        <div className="container mt-5">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-8">
                  <h4 className="card-tital mb-0 h4">Select a course</h4>
                </div>

                <div className="col-md-4">
                  <div className="row">
                    <div className="col">
                      <Form.Select
                        aria-label="Default select example"
                        name="CourseSelect"
                        onChange={selecCourse}
                      >
                        <option>Open this select menu</option>
                        {allCourses.map((cour) => {
                          return (
                            <option value={cour.id}>{cour.CourseName}</option>
                          );
                        })}
                      </Form.Select>
                    </div>

                    <div className="col-auto">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setShowModal(true);
                          setScheduleId(0);
                        }}
                        disabled={selectCourse ? false : true}
                      >
                        Add Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="course-calendar card-body">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                eventContent={renderEventContent} // custom render function
                initialView="dayGridMonth"
                displayEventEnd={true}
                weekends={true}
                events={calenderEvents.map(
                  (item) => {
                    return {
                      title: courseName,
                      start: item.SchedulerStartTime,
                      end: item.SchedulerEndTime,
                      description: item.Title,
                      id: item.ScheduleId,
                      coursetime: item.CourseTime,
                      leavestatus: item.AppliedForLeave
                    };
                  }
                )}
                eventClick={(info) => calenderHandleClick(info)}
              />
              {loadingCourseById && (
                <div className="loading-indicator">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <AddSchedule
          show={showModal}
          onHide={() => setShowModal(false)}
          courseId={selectCourse}
          scheduleId={scheduleId}
          //clickedEventData={scheduleClickedEvent}
          onSubmit={fetchDataOnSubmit}
          selCourseTimings={selectedCourseTimings}
          //onSubmit={(events) => {setCalenderEvents([...calenderEvents, events]);console.log('[...calenderEvents, events', ...calenderEvents, events)} }
        />
      )}
      {/* {showModal && (
        <DetailModal
        show={detailModalOpen}
        onHide={() => setDetailModalOpen(false)}
        //eventData={scheduleClickedEvent}
        scheduleId={scheduleId}
        courseId={courseId}
      />
      )} */}
    </>
  );
};

export default CourseSchedule;
