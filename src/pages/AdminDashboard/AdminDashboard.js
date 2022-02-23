import React, { useCallback, useEffect, useState } from "react";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import profilePic from "../../assets/images/pic-1.png";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  GET_ALL_COURSES,
  GET_ALL_SCHEDULES,
  GET_COURSE_BY_ID,
} from "../../shared/constants";
import { useQuery } from "@apollo/client";
import { MdOutlineCalendarToday } from "react-icons/md";
import { GoMortarBoard } from "react-icons/go";
import { FaBook } from "react-icons/fa";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation"

import "swiper/swiper-bundle.css";

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Controller,
  Thumbs,
  Autoplay,
} from "swiper";
import EventSchDetail from "../../components/EventSchDetail/EventSchDetail";

const AdminDashboard = (props) => {
  // const { userId } = props.history.location.state;

  const [showModal, setShowModal] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [selectCourse, setSelectCourse] = useState("");
  const [scheduleId, setScheduleId] = useState(0);
  const [scheduleClickedEvent, setScheduleClickedEvent] = useState({});
  const [calenderEvents, setCalenderEvents] = useState([]);
  const {
    loading: loadingCourses,
    data: dataCourses,
    error: errorCourse,
  } = useQuery(GET_ALL_COURSES, {
    //skip: true,
    onError: () => {
      //props.onHide()
    },
    onCompleted: () => {},
  });

  const {
    loading: loadingSchedules,
    data: dataSchedules,
    error: errorSchedules,
  } = useQuery(GET_ALL_SCHEDULES);

  const {
    loading: loadingCourseById,
    data: dataCourseById,
    error: errorCourseById,
    refetch,
  } = useQuery(GET_COURSE_BY_ID, {
    variables: { id: selectCourse },
    //skip: selectCourse === "",
    skip: true,
    onError: () => {
      //props.onHide()
    },
  });

  useEffect(() => {
    if (dataCourses) {
      console.log("dataCourses.getAllCourses", dataCourses.getAllCourses);
      setAllCourses(dataCourses.getAllCourses);
    }
  }, [dataCourses]);

  useEffect(() => {
    if (dataSchedules) {
      let NewArray = dataSchedules.getAllScheduler.map((item) => {
        return {
          title: item.Title,
          start: item.SchedulerStartTime,
          end: item.SchedulerEndTime,
          description: item.Description,
          id: item.ScheduleId,
          coursetime: item.CourseTime,
        };
      });
      setCalenderEvents(NewArray);
    }
  }, [dataSchedules]);

  const selecCourse = (e) => {
    const { value } = e.target;
    setSelectCourse(value);
  };
  const fetchDataOnSubmit = useCallback(() => {
    refetch();
  }, []);
  const renderEventContent = (eventInfo) => {
    // extendedProps: {description: 'Description1'}
    return (
      <>
        <div>{eventInfo.event.title}</div>
        <div>{eventInfo.timeText}</div>
        <div>{eventInfo.event._def.extendedProps.description}</div>
        <div>{eventInfo.event._def.extendedProps.coursetime}</div>
      </>
    );
  };
  return (
    <>
      <Header />
      <main>
        <section className="admin-section">
          <div className="container">
            <div className="profile-user pb-4">
              <img src={profilePic} alt="" className="profile-user__img" />
              <div className="admin-info">
                <h3 className="user-name">John Smith</h3>
                <p className="user-role">- Admin</p>
              </div>
            </div>

            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              //pagination={{ clickable: true }}
              className="mySwiper"
              //navigation={true}
              autoplay={{ delay: 3000 }}
            >
              {allCourses.length > 0 &&
                allCourses.slice(0, 3).map((course, i) => {
                  return (
                    <SwiperSlide key={`slide-${i}`} tag="div">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title h4">
                            <span>{course.CourseName}</span>
                          </h4>

                          <div className="profile-user">
                            {/* CourseTime EnrolledCourseTime*/}
                            {course.CourseTime.length > 0 &&
                              course.CourseTime.map((tim) => (
                                // <span class="noon-time">{tim}</span>
                                <span className={`${tim.toLowerCase()}-time`}>
                                  {tim}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </section>

        <div className="container">
          <section className="section-overview">
            <div className="row mb-3">
              <div className="col-sm-6">
                <div className="card h-100">
                  <div className="card-header">
                    <h4 className="card-tital h4 mb-0">Registered Courses</h4>
                  </div>

                  <div className="card-body">
                    <div className="regusers-card__info mb-3">
                      <h3>
                        <strong>68</strong>
                      </h3>
                      <p>Registered Courses</p>
                    </div>
                    <div class="regusers-card__icon">
                      <GoMortarBoard fontSize={60} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header">
                    <h4 className="card-tital h4 mb-0">Sections</h4>
                  </div>

                  <div className="card-body">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                    <div className="row">
                      <div className="col-auto">
                        <Link className="book-panel color-red" to="/viewcourse">
                          <div className="sections__icon sections__icon--book">
                            <FaBook />
                          </div>
                          <p>Courses</p>
                        </Link>
                      </div>
                      <div className="col-auto">
                        <Link
                          className="book-panel color-yellow"
                          to="/viewstudent"
                        >
                          <div className="sections__icon sections__icon--book">
                            <FaBook />
                          </div>
                          <p>Students</p>
                        </Link>
                      </div>
                      <div className="col-auto">
                        <Link
                          className="book-panel color-green"
                          to="/viewtutor"
                        >
                          <div className="sections__icon sections__icon--book">
                            <FaBook />
                          </div>
                          <p>Tutors</p>
                        </Link>
                      </div>
                      <div className="col-auto">
                        <Link
                          className="book-panel color-purpal"
                          to="/schedule"
                        >
                          <div className="sections__icon sections__icon--book">
                            <FaBook />
                          </div>
                          <p>Schedule</p>
                        </Link>
                      </div>
                      <div className="col-auto">
                        <Link
                          className="book-panel color-gray"
                          to="/adminpayments"
                        >
                          <div className="sections__icon sections__icon--book">
                            <FaBook />
                          </div>
                          <p>Payment</p>
                        </Link>
                      </div>
                    </div>

                    {/* {[0, 1, 2,3,4,5].map(() => {
                      return (
                        <Link 
                        
                        >
                        <div className="sections__icon sections__icon--book">
                          <FaBook />
                        </div>
                        </Link>
                      );
                    })} */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <h4 className="card-tital h4 mb-0">Schedule</h4>
            </div>

            <div className="card-body">
              <div className="course-calendar">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  weekends={true}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  eventContent={renderEventContent} // custom render function
                  events={calenderEvents}
                  eventClick={(info) => {
                    const eventDetailObject = {};
                    //setShowModal(true);
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      {showModal && (
        <EventSchDetail
          show={showModal}
          onHide={() => setShowModal(false)}

          //onSubmit={(events) => {setCalenderEvents([...calenderEvents, events]);console.log('[...calenderEvents, events', ...calenderEvents, events)} }
        />
      )}
    </>
  );
};

export default AdminDashboard;
