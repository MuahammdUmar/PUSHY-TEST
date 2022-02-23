import React, { useCallback, useEffect, useMemo, useState } from "react";
//import google from '../images/google.jpg'
//import facebook from '../images/facebook.png'
import Header from "../Header/Header";
import CourseModal from "../../components/CourseCrud/CourseModal";
import {
  DELETE_COURSE,
  GET_ALL_COURSES,
  GET_ALL_STU_PAYMENTS,
} from "../../shared/constants";
import { useMutation, useQuery } from "@apollo/client";
import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { useToasts } from "react-toast-notifications";
import ReactTable from "../../shared/data-table/react-table";

const AllStudentPayments = () => {
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [allPayments, setAllPayments] = useState([]);
  const [courseId, setCourseId] = useState(0);
  const [formType, setFormType] = useState(0);
  const { addToast } = useToasts();

  const { loading, data, error } = useQuery(GET_ALL_STU_PAYMENTS, {
    onError: {
      // Do nothiing
    },
  });
  const [deleteCourseMutation, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_COURSE, {
      onError: () => {
        //setDeleteDialogOpen(false)
      },
      variables: {
        id: courseId,
      },
      onCompleted: () => {
        addToast("Course Deleted Successfully", { appearance: "success" });
        setDeleteModalOpen(false);
        //window.location.reload()
      },
      refetchQueries: [{ query: GET_ALL_STU_PAYMENTS }],
      awaitRefetchQueries: true,
    });
  const openCourseModalFunc = (id) => {
    setOpenCourseModal(true);
    setCourseId(id);
    //Edit Course
    setFormType(2);
  };
  const deleteModalOpenFunc = (id) => {
    setDeleteModalOpen(true);
    setCourseId(id);
  };
  const deleteModalCloseFunc = useCallback(() => {
    setDeleteModalOpen(false);
  }, []);

  const deleteCourse = () => {
    deleteCourseMutation();
  };
  const closeCourseModalFunc = () => {
    setOpenCourseModal(false);
  };
  const addCourseModalFunc = () => {
    setOpenCourseModal(true);
    //Add Course
    setFormType(1);
  };

  useEffect(() => {
    if (data) {
      console.log("allcourses", data.getCurrentStudentPayments);
      setAllPayments(data.getCurrentStudentPayments);
    }
  }, [data]);

  // id: String
  // CourseId: String
  // StudentId: String
  // FirstName: String
  // LastName: String
  // Zipcode: String
  // Country: String
  // City: String
  // Address: String
  // Attachment: Attachment
  // Status: String
  // IsSubmitted: Boolean
  // CourseName: String
  // StudentName: String

  const AllPaymentsColumns = useMemo(
    () => [
      {
        Header: "Course Name",
        accessor: "CourseName",
      },
      {
        Header: "Student Name",
        accessor: "StudentName",
      },
      // {
      //   Header: "Payment",
      //   accessor: "CourseName",
      // },
      // {
      //   Header: "Total Lectures",
      //   accessor: "CourseName",
      // },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => {
          return (
            <>
              <button className="btn">
                <MdOutlineModeEditOutline fontSize={25} fill="yellow" />
              </button>
              <button className="btn">
                <MdOutlineDeleteOutline fontSize={25} fill="red" />
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Header />

      <div class="container-xl">
        <div class="table-responsive tableRes">
          <div class="table-wrapper tableWrap card">
            <div class="card-header">
              <div class="row">
                <div className="col-sm-7">
                  <h4 className="card-tital h4 mb-0">Payment Details</h4>
                </div>

                <div className="col-sm-5">
                  <div className="search-box searchBox">
                    <i className="material-icons">&#xE8B6;</i>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search&hellip;"
                    />
                  </div>
                </div>
              </div>
            </div>

            <ReactTable
              columns={AllPaymentsColumns}
              data={allPayments}
              //filterValue={value}
              loading={loading}
            />
          </div>
        </div>
      </div>
      {openCourseModal && (
        <CourseModal
          show={openCourseModal}
          onHide={closeCourseModalFunc}
          courseId={courseId}
          formType={formType}
        />
      )}
      {deleteModalOpen && (
        <DeleteModal
          show={deleteModalOpen}
          onHide={deleteModalCloseFunc}
          deleteRecord={deleteCourse}
        />
      )}
    </>
  );
};

export default AllStudentPayments;
