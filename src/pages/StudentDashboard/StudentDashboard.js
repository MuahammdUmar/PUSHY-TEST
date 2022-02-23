import React, { Suspense, useEffect, useState } from "react";
import CardImg from "../../assets/images/background-img.jpg";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Spinner } from "react-bootstrap";
import Header from "../Header/Header";
import { useQuery } from "@apollo/client";
import {
  GET_COURSE_BY_INTEREST,
  GET_COURSE_BY_ROLE,
} from "../../shared/constants";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation"

import "swiper/swiper-bundle.css";

import "./StudentDashboard.css";

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Controller,
  Thumbs,
  Autoplay,
} from "swiper";
import { Rating } from "react-simple-star-rating";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Controller, Thumbs, Autoplay]);
const LazyHeader = React.lazy(() => import("../Header/Header"));

const StudentDashboard = (props) => {
  const [allCourses, setAllCourses] = useState([]);
  const [allCoursesInter, setAllCoursesInter] = useState([]);

  const { loading, data, error } = useQuery(GET_COURSE_BY_ROLE, {
    onCompleted: () => {},
    onError: () => {
      //Do nothing
    },
    fetchPolicy: "no-cache"
  });

  const {
    loading: loadingCoursesInter,
    data: dataCoursesInter,
    error: errorCourseInter,
  } = useQuery(GET_COURSE_BY_INTEREST, {
    skip: false,
    onCompleted: () => {},
    onError: () => {},
  });

  useEffect(() => {
    if (data) {
      // {course.CourseTime.map((ti) => <span className={`${ti.toLowerCase()}-time`}>{ti}</span>)}
      console.log("data.getStudentCourses", data.getStudentCourses);
      setAllCourses(data.getStudentCourses);
    }
  }, [data]);

  useEffect(() => {
    if (dataCoursesInter) {
      setAllCoursesInter(dataCoursesInter.getCoursesOfStudentsInterest);
    }
  }, [dataCoursesInter]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyHeader />
      </Suspense>

      <div className="StudentNavRow p-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="text-white">
                <b>Hello student!</b>
                <br />
                its good to see you again
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-8 text-center">
            <h1>Area of Interest</h1>
            <hr class="w-25 text-primary mx-auto" />
            <h6 className="text-center ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              eveniet facilis, ratione velit cupiditate voluptate nisi, fugiat
              non rem error eos exercitationem ducimus culpa assumenda? nostrum
              nisi iusto ut.Modi nostrum nisi iusto ut ostrum nisi iusto ut.Modi
              nostrum nisi iusto ut
            </h6>
          </div>
        </div>

        <div className="row">
          {allCoursesInter.length > 0 &&
            allCoursesInter.map((course) => {
              return (
                <div className="col-md-4 mb-3">
                  <div className="card CourseCard h-100 w-100">
                    <img src={CardImg} className="card-img-top" alt="Img" />
                    <div className="card-body">
                      <h5 className="card-title h5 mb-10">
                        {course.CourseName}
                      </h5>

                      <Link
                        className="link-dark text-decoration-none"
                        to={{
                          pathname: "/completecourse",
                          state: { courseId: course.id },
                        }}
                      >
                        <p className="card-text course-description">
                          {course.CourseDescription}
                        </p>
                      </Link>

                      <div className="mb-10">
                        <span>{90}</span>
                        <Rating
                          ratingValue={90}
                          transition
                          size={25}
                          readonly
                        />
                      </div>

                      <Link
                        className="btn btn-primary read_button btn-xs text-white"
                        to={{
                          pathname: "/completecourse",
                          state: { courseId: course.id },
                        }}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-8">
              <h2 className="text-center">My Courses</h2>

              <hr className="mx-auto w-25 text-primary " />

              <h6 className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                eveniet facilis, ratione velit cupiditate voluptate nisi, fugiat
                non rem error eos exercitationem ducimus culpa assumenda?
                nostrum nisi iusto ut.Modi nostrum nisi iusto ut ostrum nisi
                iusto ut.Modi nostrum nisi iusto ut
              </h6>
            </div>
          </div>

          <div className="my-5">
            {loadingCoursesInter && (
              <div className="loading-indicator">
                <Spinner animation="border" variant="primary" />
              </div>
            )}
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              pagination={{ clickable: true }}
              className="mySwiper pb-5"
              navigation={true}
              autoplay={{ delay: 3000 }}
            >
              {!loadingCoursesInter &&
                allCourses.map((course, i) => {
                  return (
                    <SwiperSlide key={`slide-${i}`} tag="div">
                      <div className="card CourseCard h-100 w-100">
                        <img src={CardImg} className="card-img-top" alt="Img" />
                        <div className="card-body">
                          <h5 className="card-title h5 mb-10 justify-content-between d-flex align-items-center">
                            <div>{course.CourseName}</div>

                            <div>
                              {course.IsPaymentPending ? (
                                <span className="morning-time btn-xs m-0">
                                  Approved
                                </span>
                              ) : (
                                <span className="noon-time btn-xs m-0">
                                  Pending
                                </span>
                              )}
                            </div>
                          </h5>

                          <div className="mb-10">
                            {course.CourseTime.map((ti) => (
                              <span
                                className={`${ti.toLowerCase()}-time btn-xs`}
                              >
                                {ti}
                              </span>
                            ))}
                          </div>

                          <Link
                            className="link-dark text-decoration-none"
                            to={{
                              pathname: "/completecourse",
                              state: { courseId: course.id },
                            }}
                          >
                            <p className="card-text course-description">
                              {course.CourseDescription}
                            </p>
                          </Link>

                          <div className="mb-10">
                            <span>{90}</span>
                            <Rating
                              ratingValue={90}
                              transition
                              size={25}
                              readonly
                            />
                          </div>

                          <Link
                            className="btn btn-primary read_button btn-xs text-white"
                            to={{
                              pathname: "/completecourse",
                              state: { courseId: course.id },
                            }}
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>

        <div className="row mb-5 justify-content-center">
          <div className="col-8 text-center">
            <h1>SESSION SCHEDULE</h1>
            <hr class="w-25 text-primary mx-auto" />
            <h6 className="text-center ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              eveniet facilis, ratione velit cupiditate voluptate nisi, fugiat
              non rem error eos exercitationem ducimus culpa assumenda? nostrum
              nisi iusto ut.Modi nostrum nisi iusto ut ostrum nisi iusto ut.Modi
              nostrum nisi iusto ut
            </h6>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">
            <div className="course-calendar">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
