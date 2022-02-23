import React, { useState, useEffect } from "react";
//import google from '../images/google.jpg'
//import facebook from '../images/facebook.png'
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Rating } from "react-simple-star-rating";
import { CgProfile } from "react-icons/cg";
import Header from "../Header/Header";
import { GET_ALL_TUTORS_COURSES } from "../../shared/constants";
import { useQuery } from "@apollo/client";
import CardImg from "../../assets/images/background-img.jpg";

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
import "./TutorDashboard.css";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Controller, Thumbs, Autoplay]);

const TutorDashboard = (props) => {
  const [allCourses, setAllCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const { loading, data, error } = useQuery(GET_ALL_TUTORS_COURSES, {
    onCompleted: () => {},
    onError: () => {
      //Do nothing
    },
    fetchPolicy: "no-cache"
  });

  const [rating, setRating] = useState(0); // initial rating value

  //const { userId } = props.history.location.state;

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    //console.log(userId)

    // other logic
  };

  useEffect(() => {
    if (data) {
      setAllCourses(data.getAllCoursesForCurrentTutor);
    }
  }, [data]);

  return (
    <>
      <Header />
      <div className="tutornav mb-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-1 offset-1  pb-4 pt-4 fs-5 ">
              <CgProfile size={60} />
            </div>

            <div className="col-sm-4 mb-3 hello  pb-4 pt-4 fs-5 ">
              Hello,
              <h4>
                <b>{user && user.Firstname}</b>
              </h4>
            </div>

            {/* <div className="col-sm-4 mb-3 offset-5 pb-4 pt-4 mt-2  ">
              <Rating
                onClick={handleRating}
                ratingValue={rating}
                fillColor="white"
              />
            </div> */}
          </div>
        </div>
      </div>

      <div className="container">
        <div class="row justify-content-center mb-5">
          <div class="col-8">
            <h2 class="text-center">My Courses</h2>
            <hr class="mx-auto w-25 text-primary" />
            <h6 class="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              eveniet facilis, ratione v elit cupiditate voluptate nisi, fugiat
              non rem error eos exercitationem ducimus culpa assumenda? nostrum
              nisi iusto ut.Modi nostrum nisi iusto ut ostrum nisi iusto ut.Modi
              nostrum nisi iusto ut
            </h6>
          </div>
        </div>

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          className="mySwiper"
          navigation={true}
          autoplay={{ delay: 3000 }}
        >
          {allCourses.map((course, i) => {
            return (
              <SwiperSlide key={`slide-${i}`} tag="div">
                <div className="card h-100">
                  <img src={CardImg} className="card-img-top" alt="Img" />

                  <div className="card-body">
                    <h4 className="card-title">{course.CourseName}</h4>

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
                      <Rating ratingValue={90} transition size={25} readonly />
                    </div>

                    <Link
                      className="btn btn-primary read_button btn-xs text-white"
                      to={{
                        pathname: "/tutorcoursedetail",
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

        <div class="row justify-content-center mt-5 mb-3">
          <div class="col-8">
            <h2 class="text-center">Dashboard</h2>
            <hr class="mx-auto w-25 text-primary" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">
                  <i className="bi bi-mortarboard-fill icon"></i>
                  <Link to="mycourses" className="course_link ms-2">
                    My Course
                  </Link>
                </h4>
              </div>

              <div className="card-body">
                12 <span class="ms-3 d-inline-block">My Course</span>
              </div>
            </div>
          </div>

          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">
                  <i className="bi bi-mortarboard-fill icon"></i>
                  <Link to="mycourses" className="course_link ms-2">
                    Active Course
                  </Link>
                </h4>
              </div>

              <div className="card-body">
                12 <span class="ms-3 d-inline-block">Active Course</span>
              </div>
            </div>
          </div>

          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">
                  <i class="bi bi-trophy icon"></i>
                  <Link to="mycourses" className="course_link ms-2">
                    complete course
                  </Link>
                </h4>
              </div>

              <div className="card-body">
                12 <span class="ms-3 d-inline-block">complete course</span>
              </div>
            </div>
          </div>

          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">
                  <i class="bi bi-person-fill icon"></i>
                  Enrolled student
                </h4>
              </div>

              <div className="card-body">
                12 <span class="ms-3 d-inline-block">Enrolled student</span>
              </div>
            </div>
          </div>

          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">
                  <i class="bi bi-calendar4-week icon"></i>
                  <Link to="mycourses" className="course_link ms-2">
                    Attendance
                  </Link>
                </h4>
              </div>

              <div className="card-body">
                12 <span class="ms-3 d-inline-block">Attendance</span>
              </div>
            </div>
          </div>

          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">
                  <i class="bi bi-currency-dollar icon"></i>
                  <Link to="mycourses" className="course_link ms-2">
                    Total Earning
                  </Link>
                </h4>
              </div>

              <div className="card-body">
                12 <span class="ms-3 d-inline-block">Total Earning</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h4 className="card-tital h4 mb-0">SESSION SCHEDULE</h4>
          </div>
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

export default TutorDashboard;
