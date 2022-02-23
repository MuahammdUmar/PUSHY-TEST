import React, { useEffect, useState } from "react";
// import Avatar from 'react-avatar';
import { BsCurrencyDollar } from "react-icons/bs";
import { GiGraduateCap } from "react-icons/gi";
import { FaAward } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
// import DashboardImg from "../images/dashboard.png";
// import DashboardImg from "../images/background-img.jpg";
import DashboardImg from "../../assets/images/dashboardpic.png";
import Header from "../Header/Header";
import userPict from "../../assets/images/pic-1.png";
import productImg from "../../assets/images/img.jpg";
import CardImg from "../../assets/images/background-img.jpg";

import { Link } from "react-router-dom";
import { GET_ALL_COURSES, GET_APPROVED_RATING } from "../../shared/constants";
import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation"

import "swiper/swiper-bundle.css";

import "./Dashboard.css";

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Controller,
  Thumbs,
  Autoplay,
} from "swiper";
import { Carousel, Spinner } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import filePickerService from "../../shared/file-stack/file-picker.service";
const LazyHeader = React.lazy(() => import("../Header/Header"));

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Controller, Thumbs, Autoplay]);

const Dashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const {
    loading: loadingCourses,
    data: dataCourses,
    error: errorCourse,
  } = useQuery(GET_ALL_COURSES);

  const slides = [];
  for (let i = 0; i < 5; i += 1) {
    slides.push(
      <SwiperSlide key={`slide-${i}`} tag="li">
        <img
          src={`https://picsum.photos/id/${i + 1}/500/300`}
          style={{ listStyle: "none" }}
          alt={`Slide ${i}`}
        />
      </SwiperSlide>
    );
  }

  const { data: dataRatings } = useQuery(GET_APPROVED_RATING);

  useEffect(() => {
    if (dataCourses) {
      console.log("dataCourses.getAllCourses", dataCourses.getAllCourses);
      setAllCourses(dataCourses.getAllCourses);
    }
    if (dataRatings) {
      console.log(
        "dataRatings.getApprovedRatings",
        dataRatings.getApprovedRatings
      );
      setRatings(dataRatings.getApprovedRatings);
    }
  }, [dataCourses, dataRatings]);

  return (
    <>
      <Header />
      {/* Main Image */}
      <div className="mb-5">
        <img className="img-fluid" src={DashboardImg} alt="" />
      </div>

      {/* SELECTION OF COURSES */}

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-12 justify-content-center">
            <h2 className="text-center">SELECTION OF COURSES</h2>
            <hr className="container w-25 text-primary" />
            <div className="col-12 container">
              <h6 className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                eveniet facilis, ratione velit cupiditate voluptate nisi, fugiat
                non rem error eos exercitationem ducimus culpa assumenda?
                nostrum nisi iusto ut.Modi nostrum nisi iusto ut
              </h6>
            </div>
          </div>
        </div>

        <div className="mt-5">
          {loadingCourses && (
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
            {!loadingCourses &&
              allCourses.map((course, i) => {
                return (
                  <SwiperSlide className="" key={`slide-${i}`} tag="div">
                    <div className="card CourseCard h-100 w-100">
                      <img
                        //src={course.CourseImage ? filePickerService.getDownloadLink(course.CourseImage.AttachmentFileHandle): 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png'}
                        className="card-img-top"
                        src={CardImg}
                        alt="Course Picture"
                      />

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
                          <span>{course.AverageRating}</span>
                          <Rating
                            ratingValue={
                              course.AverageRating ? course.AverageRating : 0
                            }
                            transition
                            size={25}
                            readonly
                          />
                        </div>

                        <h6 className="mb-10">
                          ${course.Price ? course.Price : 0}
                        </h6>

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

      {/* WHY TECHIQ PLATFORM?  */}

      <div className="why-techiq">
        <div className="container-fluid mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-12 mt-5">
              <h2 className="text-center text-white">WHY TECHIQ PLAT FORM</h2>
              <hr className="container w-25 text-primary" />
              <div className="col-12 container">
                <h6 className="text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  eveniet facilis, ratione velit cupiditate voluptate nisi,
                  fugiat non rem error eos exercitationem ducimus culpa
                  assumenda? nostrum nisi iusto ut.Modi nostrum nisi iusto ut
                </h6>
              </div>
            </div>
          </div>
          <div className="row mt-5 ms-5 justify-content-center text-white">
            <div className="col-2">
              <GiGraduateCap className="dashboard-icons" />
              Modern Courses
            </div>
            <div className="col-2">
              <FaAward className="dashboard-icons" />
              Guaranteed Career
            </div>
            <div className="col-2">
              <BsCurrencyDollar className="dashboard-icons" />
              Affordable Costs
            </div>
            <div className="col-2 mb-5">
              <GiTeacher className="dashboard-icons" />
              Best faculties
            </div>
          </div>
        </div>
      </div>

      <section className="review" id="review">
        <h3 className="sub-heading">Student's Review </h3>
        <h1 className="heading"> what they say </h1>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          //pagination={{ clickable: true }}
          className="mySwiper"
          //navigation={true}
          autoplay={{ delay: 3000 }}
        >
          {ratings &&
            ratings.map((rating, i) => {
              return (
                <SwiperSlide
                  className="slider-card"
                  key={`slide-${i}`}
                  tag="div"
                >
                  <div className="swiper-slide review-slide">
                    <i className="fas fa-quote-right"></i>
                    <div className="user">
                      <img src={userPict} alt="img" className="profile-img" />
                      <div className="user-info">
                        <h4 className="card-tital h4 mb-0">
                          {rating.StudentName}
                        </h4>
                        <div className="stars">
                          <Rating ratingValue={rating.Rating} />
                        </div>
                      </div>
                    </div>
                    <p>{rating.Comment}</p>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </section>

      {/* HELP */}
      <div className="help">
        <div className="container-fluid mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-12 mt-5">
              <h2 className="text-center text-white">HELP?</h2>
              <hr className="container w-25 text-primary " />

              <div className="col-12 container">
                <h6 className="text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  eveniet facilis, ratione velit cupiditate voluptate nisi,
                  fugiat non rem error eos exercitationem ducimus culpa
                  assumenda? nostrum nisi iusto ut.Modi nostrum nisi iusto ut
                </h6>
              </div>
            </div>
            <Link
              type="button"
              to="/faq"
              className="btn btn-primary mt-5 w-25 mb-5"
            >
              FAQs
            </Link>
            <Link
              type="button"
              to="/contactus"
              className="btn btn-primary ms-5 mt-5 w-25 mb-5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* STUDENTS REVIEWS*/}
      <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-12 ">
            <h2 className="text-center">STUDENTS REVIEWS</h2>
            <hr className="container w-25 text-primary" />

            <div className="col-12 container mt-5 mb-5">
              <h6>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                eveniet facilis, ratione velit cupiditate voluptate nisi, fugiat
                non rem error eos exercitationem ducimus culpa assumenda?
                nostrum nisi iusto ut.Modi nostrum nisi iusto ut
              </h6>
            </div>
            <div className="row mt-3">
              <div className="col-12 avatar">
                {/* <Avatar className='me-5' facebookId="100008343750912" size="65" round={true} /> */}
                <CgProfile className="dashboard-icons me-3" /> Lorem ipsum
                dolor, sit amet consectetur adipisicing elit.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
