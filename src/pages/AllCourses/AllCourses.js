import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import Header from "../Header/Header";
import { Link } from "react-router-dom";


import {
  GET_ALL_COURSES,
} from "../../shared/constants";
import { useToasts } from "react-toast-notifications";

const AllCourses = (props) => {
    
   // const [LanguageError, setLanguageError] = useState("");
   const [allCourses, setAllCourses] = useState([]);


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

  useEffect(() => {
    if (dataCourses) {
      console.log("dataCourses.getAllCourses", dataCourses.getAllCourses);
      setAllCourses(dataCourses.getAllCourses);
    }
  }, [dataCourses]);

    return (
        <>
        <Header/>
         <div className="border py-5 nave">
        <div className="container">
          <h2 className="text-white mb-0">
            <b>Courses</b>
          </h2>
        </div>
      </div>

      <div className="container">
        <div className="row toper">
          {allCourses.map((course) => {
            return (
              <div className="col-md-3 mb-3">
                <div className="card CourseCard h-100">
                  <div className="card-header">
                    <h4 className="card-title mb-0">
                      <img
                        src="https://cdn.pixabay.com/photo/2016/01/23/16/02/book-1157658_960_720.png"
                        className="mono"
                        alt="img"
                      />
                      {course.CourseName}
                    </h4>
                  </div>

                  <div className="card-body maintain">
                    <p className="card-text reading">
                      {course.CourseDescription}
                    </p>
                  </div>

                  <div className="card-footer d-flex justify-content-between align-items-center">
                  
                    
                    <Link
                      className="btn btn-primary read_button"
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

export default AllCourses;
