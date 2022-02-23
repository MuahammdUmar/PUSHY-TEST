import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TutorCourses.css";
import { BsThreeDots } from "react-icons/bs";
import {
  GET_ALL_TUTORS_COURSES,
  GET_COURSE_BY_ROLE,
} from "../../shared/constants";
import { useQuery } from "@apollo/client";
import Header from "../Header/Header";
import { Rating } from "react-simple-star-rating";

const TutorCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [currUser, setCurrUser] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const { loading, data, error } = useQuery(GET_ALL_TUTORS_COURSES, {
    onCompleted: () => {},
    onError: () => {
      //Do nothing
    },
  });
  useEffect(() => {
    if (data) {
      console.log(
        "data.getAllCoursesForCurrentTutor",
        data.getAllCoursesForCurrentTutor
      );
      setAllCourses(data.getAllCoursesForCurrentTutor);
    }
  }, [data]);
  return (
    <>
      <Header />
      <div className="border py-5 nave mb-5">
        <div className="container">
          <h2 className="text-white mb-0">
            <b>My Courses</b>
          </h2>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {allCourses.map((course) => {
            return (
              <div className="col-md-4 mb-3">
                <div className="card CourseCard h-100 w-100">
                  <div className="card-header">
                    <h4 className="card-title">
                      <img
                        src="https://cdn.pixabay.com/photo/2016/01/23/16/02/book-1157658_960_720.png"
                        className="mono"
                      />
                      {course.CourseName}
                    </h4>
                    {course.CourseTime.map((ti) => (
                      <span className={`${ti.toLowerCase()}-time`}>{ti}</span>
                    ))}
                  </div>

                  <div className="card-body">
                    <Link
                      className="link-dark text-decoration-none"
                      to={{
                        pathname: "/completecourse",
                        state: { courseId: course.id },
                      }}
                    >
                      <p className="card-text">{course.CourseDescription}</p>
                    </Link>
                  </div>

                  <div className="card-footer d-flex justify-content-between align-items-center">
                    {/* <div className="">
                      <div className="d-inline-flex">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                          className="dp_image"
                          alt="img"
                        />

                        <h5 className="ms-2  text-primary">Firstname</h5>
                      </div>

                      <div>
                        <p className="professor">Professor of DBMS</p>
                      </div>
                    </div> */}
                     <div>
                          <span>{90}</span>
                          <Rating
                            ratingValue={
                              90
                            }
                            transition
                            size={25}
                            readonly
                          />
                        </div>  
                    <Link
                      className="btn btn-primary read_button"
                      to={{
                        pathname: "/tutorcoursedetail",
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

          {/* <div className="col-md-3">
                        <div className="card CourseCard">
                            <div className=" SetBorder nav-item dropdown ">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <BsThreeDots className="doted" />
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Edit</a></li>
                                    <li><a class="dropdown-item" href="#">Remove</a></li>
                                
                                </ul>
                            </div>
                            <div className="card-body maintain">
                                <h4 className="card-title"><img src="https://cdn.pixabay.com/photo/2016/01/23/16/02/book-1157658_960_720.png" className="mono" /> C++ Programming</h4>
                                <p className="card-text reading">Students will become familiar with the major programming languages, techniques and tools.</p>
                                <div className="d-inline-flex">
                                    <img src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" className="dp_image" />
                                    <h5 className="ms-2  text-primary">Alex Costa</h5>
                                </div>
                                <div><p className="professor">Professor of DBMS</p></div>
                                <Link to="completecourse"><a href="#" className="btn btn-primary read_button">Read More</a></Link>

                            </div>
                        </div>
                    </div> */}

          {/* <div className="col-md-3">
                        <div className="card CourseCard">
                            <div className=" SetBorder nav-item dropdown ">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <BsThreeDots className="doted" />
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Edit</a></li>
                                    <li><a class="dropdown-item" href="#">Remove</a></li>
                                   
                                </ul>
                            </div>
                            <div className="card-body maintain">
                                <h4 className="card-title"><img src="https://cdn.pixabay.com/photo/2016/01/23/16/02/book-1157658_960_720.png" className="mono" /> React JS</h4>
                                <p className="card-text reading">Web Engineering introduces a structured methodology utilized in software engineering.</p>
                                <div className="d-inline-flex">
                                    <img src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" className="dp_image" />
                                    <h5 className="ms-2  text-primary">Alex Costa</h5>
                                </div>
                                <div><p className="professor">Professor of DBMS</p></div>
                                <Link to="completecourse"><a href="#" className="btn btn-primary read_button">Read More</a></Link>

                            </div>
                        </div>
                    </div> */}
        </div>
        {/* <div className="row justify-content-center toper">
                    <div className="col-md-3">
                        <div className="card CourseCard">
                            <div className=" SetBorder nav-item dropdown ">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <BsThreeDots className="doted" />
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Edit</a></li>
                                    <li><a class="dropdown-item" href="#">Remove</a></li>
                                   
                                </ul>
                            </div>
                            <div className="card-body maintain">
                                <h4 className="card-title"><img src="https://cdn.pixabay.com/photo/2016/01/23/16/02/book-1157658_960_720.png" className="mono" /> Software Engr</h4>
                                <p className="card-text reading">Students will become familiar with the major programming languages, techniques and tools.</p>
                                <div className="d-inline-flex">
                                    <img src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" className="dp_image" />
                                    <h5 className="ms-2  text-primary">Alex Costa</h5>
                                </div>
                                <div><p className="professor">Professor of DBMS</p></div>
                                <Link to="completecourse"><a href="#" className="btn btn-primary read_button">Read More</a></Link>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card CourseCard">
                            <div className=" SetBorder nav-item dropdown ">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <BsThreeDots className="doted" />
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Edit</a></li>
                                    <li><a class="dropdown-item" href="#">Remove</a></li>
                                   
                                </ul>
                            </div>
                            <div className="card-body maintain">
                                <h4 className="card-title"><img src="https://cdn.pixabay.com/photo/2016/01/23/16/02/book-1157658_960_720.png" className="mono" /> Data Base</h4>
                                <p className="card-text reading">Master your language with lessons, quizzes, and projects designed for real-life scenarios.</p>
                                <div className="d-inline-flex">
                                    <img src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" className="dp_image" />
                                    <h5 className="ms-2  text-primary">Alex Costa</h5>
                                </div>
                                <div><p className="professor">Professor of DBMS</p></div>
                                <Link to="completecourse"><a href="#" className="btn btn-primary read_button">Read More</a></Link>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3" >
                        <div className="card CourseCard">
                            <div className=" SetBorder nav-item dropdown ">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <BsThreeDots className="doted" />
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Edit</a></li>
                                    <li><a class="dropdown-item" href="#">Remove</a></li>
                                    
                                </ul>
                            </div>
                            <div className="card-body maintain">
                                <h4 className="card-title"><img src="https://cdn.pixabay.com/photo/2016/01/23/16/02/book-1157658_960_720.png" className="mono" /> IT Capston</h4>
                                <p className="card-text reading">This will introduces a structured methodology utilized in software engineering.</p>
                                <div className="d-inline-flex">
                                    <img src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" className="dp_image" />
                                    <h5 className="ms-2  text-primary">Alex Costa</h5>
                                </div>
                                <div><p className="professor">Professor of DBMS</p></div>
                                <Link to="completecourse"><a href="#" className="btn btn-primary read_button">Read More</a></Link>

                            </div>
                        </div>
                    </div>
                </div> */}
      </div>
    </>
  );
};
export default TutorCourses;
