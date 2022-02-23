import "./ViewStudent.css";
import Header from "../Header/Header";
import React, { useState, useEffect, useMemo } from "react";
import EditStudent from "../EditStudent/EditStudent";
import { useMutation, useQuery } from "@apollo/client";
import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { useToasts } from "react-toast-notifications";
import { DELETE_USER, GET_ALL_STUDENTS } from "../../shared/constants";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import moment from "moment";
import ReactTable from "../../shared/data-table/react-table";

const ViewStudent = () => {
  const [show, setShow] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [updateId, setUpdateId] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { addToast } = useToasts();

  const handleClose = () => {
    setShow(false);
    setUpdateId(0);
  };
  const handleShow = (id) => {
    setUpdateId(id);
    setShow(true);
  };

  // console.log(allStudents)
  const {
    error: errorStudents,
    loading: loadingStudents,
    data: dataStudents,
  } = useQuery(GET_ALL_STUDENTS, {
    onError: () => {
      //on error
    },
    onCompleted: () => {},
  });
  const [deleteUserMutation, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_USER, {
      onError: () => {
        //setDeleteDialogOpen(false)
      },
      variables: {
        id: updateId,
      },
      onCompleted: () => {
        addToast("User Deleted Successfully", { appearance: "success" });
        setDeleteModalOpen(false);
      },
      refetchQueries: [{ query: GET_ALL_STUDENTS }],
      awaitRefetchQueries: true,
    });

  const deleteModalOpenFunc = (id) => {
    setUpdateId(id);
    setDeleteModalOpen(true);
  };
  const deleteModalCloseFunc = () => {
    setDeleteModalOpen(false);
  };
  const deleteUser = () => {
    deleteUserMutation();
  };
  useEffect(() => {
    if (dataStudents) {
      console.log("datasssssssssss", dataStudents.getAllStudents);
      setAllStudents(dataStudents.getAllStudents);
    }
  }, [dataStudents]);

  // const handleDelete = () => {};

  const AllStudentsColumns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "Firstname",
      },
      {
        Header: "Last Name",
        accessor: "Lastname",
      },
      {
        Header: "Email",
        accessor: "Email",
      },
      {
        Header: "Date Of Birth",
        accessor: "DOB",
        Cell: ({ row }) => {
          return (
            <>{moment(row.original.DOB).format("DD MM YYYY hh:mm:ss A")}</>
          );
        },
      },
      // {
      //   Header: "Date Of Birth",
      //   accessor: "DOB",
      //   Cell: ({row}) => {
      //     return(
      //     <>
      //     {row.original.DOB !== null ? row.original.DOB.substring(0, 10) : row.original.DOB}
      //     </>)
      //   }
      // },
      {
        Header: "Address",
        accessor: "Address1",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => {
          return (
            <>
              <button
                className="btn"
                onClick={() => handleShow(row.original.id)}
              >
                <MdOutlineModeEditOutline fontSize={25} fill="yellow" />
              </button>
              <button
                className="btn"
                disabled={deleteLoading}
                onClick={() => deleteModalOpenFunc(row.original.id)}
              >
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
      <div className="container-xl ">
        <div className="table-responsive tableRes">
          <div className="table-wrapper tableWrap card">
            <div className="table-title tableTitle card-header">
              <div className="row">
                <div className="col-sm-8">
                  <h4 className="card-tital h4 mb-0">Student Details</h4>
                </div>
                <div className="col-sm-4">
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
              columns={AllStudentsColumns}
              data={allStudents}
              //filterValue={value}
              loading={loadingStudents}
            />
          </div>
        </div>
      </div>
      {show && (
        <EditStudent show={show} onHide={handleClose} studentId={updateId} />
      )}
      {deleteModalOpen && (
        <DeleteModal
          show={deleteModalOpen}
          onHide={deleteModalCloseFunc}
          deleteRecord={deleteUser}
        />
      )}
    </>
  );
};

export default ViewStudent;
