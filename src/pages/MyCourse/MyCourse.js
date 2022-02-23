import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyCourse.css";
import { BsThreeDots } from "react-icons/bs";
import { GET_COURSE_BY_ROLE } from "../../shared/constants";
import { useQuery } from "@apollo/client";
import Header from "../Header/Header";
import { Rating } from "react-simple-star-rating";

const MyCourse = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [currUser, setCurrUser] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const { loading, data, error } = useQuery(GET_COURSE_BY_ROLE, {
    onCompleted: () => {},
    onError: () => {
      //Do nothing
    },
  });
  useEffect(() => {
    if (data) {
      console.log("student courses", data.getStudentCourses);
      setAllCourses(data.getStudentCourses);
    }
  }, [data]);
  return (
    <>
      <Header />
      <div className="border py-5 nave">
        <div className="container">
          <h2 className="text-white mb-0">
            <b>My Courses</b>
          </h2>
        </div>
      </div>

      <div className="container">
        <div className="row toper">
          {allCourses.map((course) => {
            return (
              <div className="col-md-3 mb-3">
                <div className="card CourseCard h-100">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/01/23/16/02/book-1157658_960_720.png"
                    className="card-img-top"
                    alt="img"
                  />
                  <div className="card-body">
                    <h4 className="card-title mb-10">{course.CourseName}</h4>

                    <p className="card-text course-description mb-10">
                      {course.CourseDescription}
                    </p>

                    <div className="mb-10">
                      <span>{90}</span>
                      <Rating ratingValue={90} transition size={25} readonly />
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
      </div>
    </>
  );
};
export default MyCourse;
