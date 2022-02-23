import React, { useCallback, useEffect, useMemo, useState } from "react";
//import google from '../images/google.jpg'
//import facebook from '../images/facebook.png'
import Header from "../Header/Header";
import CourseModal from "../../components/CourseCrud/CourseModal";
import {
  DELETE_ASSIGNMENT,
  DELETE_COURSE,
  GET_ALL_ASSIGNMENTS,
  GET_ALL_COURSES,
  GET_STUDENT_ASSIGNMENT_BY_ID,
} from "../../shared/constants";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { useToasts } from "react-toast-notifications";
import AssignmentModal from "../../components/AssignmentModal/AssignmentModal";
import moment from "moment";
import { Badge, Table } from "react-bootstrap";
import ReactTable from "../../shared/data-table/react-table";
import { useAsyncDebounce } from "react-table";
import { Form } from "react-bootstrap";
import StudentAssignmentModal from "../../components/StudentAssignmentModal/StudentAssignmentModal";

const AllAssignments = () => {
  const [openAssignmentModal, setOpenAssignmentModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [allAssignments, setAllAssignments] = useState([]);
  const [allStudentAssignments, setAllStudentAssignments] = useState([]);
  const [assignmentId, setAssignmentId] = useState(0);
  const [preSelectAssignmentId, setPreSelectedAssignmentId] = useState(0);
  const [formType, setFormType] = useState(0);
  const [studenAssiModal, setStudenAssiModal] = useState(false);
  const [studenAssiId, setStudenAssiId] = useState(0);
  const { addToast } = useToasts();

  const [value, setValue] = useState();

  const globalFilterChange = useAsyncDebounce((value) => {
    //setGlobalFilter(value || undefined);
  }, 300);

  const { loading, data, error } = useQuery(GET_ALL_ASSIGNMENTS, {
    onError: () => {
      // Do nothiing
    },
    onCompleted: () => {},
  });
  const {
    loading: loadingStudentAss,
    data: dataStudentAss,
    error: erroStudentAss,
  } = useQuery(GET_STUDENT_ASSIGNMENT_BY_ID, {
    variables: { id: preSelectAssignmentId && preSelectAssignmentId },
    skip: !preSelectAssignmentId || preSelectAssignmentId === 0,
    onError: () => {
      // Do nothiing
    },
    onCompleted: () => {},
  });
  // const [loadEntries, { data: entriesData, error: entriesError, loading: entriesLoading }] = useLazyQuery(GET_STUDENT_ASSIGNMENT_BY_ID);

  const [deleteCourseMutation, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_ASSIGNMENT, {
      onError: () => {
        //setDeleteDialogOpen(false)
      },
      variables: {
        id: assignmentId,
      },
      onCompleted: () => {
        addToast("Assignement Deleted Successfully", { appearance: "success" });
        setDeleteModalOpen(false);
        //window.location.reload()
      },
      refetchQueries: [{ query: GET_ALL_ASSIGNMENTS }],
      awaitRefetchQueries: true,
    });
  const openAssignmentModalFunc = useCallback((id, type) => {
    setFormType(type);
    setAssignmentId(id);
    setOpenAssignmentModal(true);
  }, []);

  const deleteModalOpenFunc = (id) => {
    setAssignmentId(id);
    setDeleteModalOpen(true);
  };
  const deleteModalCloseFunc = useCallback(() => {
    setDeleteModalOpen(false);
  }, []);

  const deleteCourse = () => {
    deleteCourseMutation();
  };
  const closeAssignmentModalFunc = () => {
    setOpenAssignmentModal(false);
  };

  useEffect(() => {
    if (data) {
      console.log("all assignments", data.getAllAssignments);
      setAllAssignments(data.getAllAssignments);
      setPreSelectedAssignmentId(
        data.getAllAssignments[0] && data.getAllAssignments[0].id
      );
    }
  }, [data]);

  useEffect(() => {
    if (dataStudentAss) {
      console.log(
        "student assignmentssssssssssss",
        dataStudentAss.getAllStudentAssignmentsById
      );
      setAllStudentAssignments(dataStudentAss.getAllStudentAssignmentsById);
    }
  }, [dataStudentAss]);

  const AllAssignmentsColumns = useMemo(
    () => [
      {
        Header: "Assignment Title",
        accessor: "AssignmentName",
        Cell: ({ row }) => {
          //console.log("row", row.original.id, preSelectAssignmentId)
          return (
            <Form.Check
              type="radio"
              checked={row.original.id === preSelectAssignmentId ? true : false}
              aria-labelledby={row.original.id}
              label={row.original.AssignmentName}
              onChange={() => setPreSelectedAssignmentId(row.original.id)}
            />
          );
        },
      },
      {
        Header: "Start Date",
        accessor: "StartDate",
        Cell: ({ row }) => {
          return (
            <>
              {moment(row.original.StartDate).format("DD MM YYYY hh:mm:ss A")}
            </>
          );
        },
      },
      {
        Header: "End Date",
        accessor: "EndDate",
        Cell: ({ row }) => {
          return (
            <>{moment(row.original.EndDate).format("DD MM YYYY hh:mm:ss A")}</>
          );
        },
      },
      {
        Header: "Course Name",
        accessor: "CourseName",
      },
      {
        Header: "Course Timings",
        accessor: "CourseTime",
        Cell: ({ row }) =>
          row.original.CourseTime.map((name) => (
            <Badge pill bg="dark">
              {name}
            </Badge>
          )),
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => {
          return (
            <>
              <button
                className="btn"
                onClick={() => openAssignmentModalFunc(row.original.id, 2)}
              >
                <MdOutlineModeEditOutline fontSize={25} fill="yellow" />
              </button>
              <button
                className="btn"
                onClick={() => deleteModalOpenFunc(row.original.id)}
              >
                <MdOutlineDeleteOutline fontSize={25} fill="red" />
              </button>
            </>
          );
        },
      },
    ],
    [preSelectAssignmentId]
  );

  const AllAssignmentsStudentsColumns = useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "StudentName",
      },
      {
        Header: "Assignment Title",
        accessor: "AssignmentName",
      },
      {
        Header: "Submission Date",
        accessor: "EndDate",
        Cell: ({ row }) => {
          return (
            <>{moment(row.original.EndDate).format("DD MM YYYY hh:mm:ss A")}</>
          );
        },
      },
      {
        Header: "Course Name",
        accessor: "CourseName",
      },
      // {
      //   Header: "Course Timings",
      //   accessor: "CourseTime",
      //   Cell: ({ row }) =>
      //     row.original.CourseTime.map((name) => (
      //       <Badge pill bg="dark">
      //         {name}
      //       </Badge>
      //     )),
      // },
      {
        Header: "Status",
        accessor: "Status",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => {
          return (
            <>
              <button
                className="btn"
                disabled={deleteLoading}
                onClick={() =>
                  handleClickStudModal(row.original.StudentAssignmentId)
                }
              >
                <MdOutlineModeEditOutline fontSize={25} fill="yellow" />
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  const handleClickStudModal = (id) => {
    setStudenAssiModal(true);
    setStudenAssiId(id);
  };
  const loadingInd = loading || loadingStudentAss;
  return (
    <>
      <Header />

      <div class="container">
        <div class="table-responsive tableRes">
          <div class="table-wrapper tableWrap datatable custom-datatable card mb-3">
            <div class="table-title tableTitle card-header">
              <div class="row">
                <div className="col-sm-7">
                  <h4 className="card-tital h4 mb-0">Assignment Details</h4>
                </div>

                <div className="col-sm-5">
                  <div className="row">
                    <div className="col-auto">
                      <button
                        className="btn btn-primary"
                        onClick={() => openAssignmentModalFunc(0, 1)}
                      >
                        Add Assignment
                      </button>
                    </div>

                    <div className="col">
                      <div className="search-box searchBox">
                        <i className="material-icons">&#xE8B6;</i>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search&hellip;"
                          onChange={(e) => {
                            setValue(e.target.value);
                            globalFilterChange(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ReactTable
              columns={AllAssignmentsColumns}
              data={allAssignments}
              //editDialogOpen={openAssignmentModalFunc}
              filterValue={value}
              loading={loading}
            />
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-tital h4 mb-0">Assignment Results</h4>
            </div>

            <ReactTable
              columns={AllAssignmentsStudentsColumns}
              data={allStudentAssignments}
              //editDialogOpen={openAssignmentModalFunc}
              //filterValue={value}
              loading={!loading && loadingStudentAss}
            />
          </div>
        </div>
      </div>
      {openAssignmentModal && (
        <AssignmentModal
          show={openAssignmentModal}
          onHide={closeAssignmentModalFunc}
          formType={formType}
          assignmentId={assignmentId}
        />
      )}
      {deleteModalOpen && (
        <DeleteModal
          show={deleteModalOpen}
          onHide={deleteModalCloseFunc}
          deleteRecord={deleteCourse}
        />
      )}
      {studenAssiModal && (
        <StudentAssignmentModal
          show={studenAssiModal}
          onHide={() => setStudenAssiModal(false)}
          studAssingId={studenAssiId}
        />
      )}
    </>
  );
};

export default AllAssignments;
