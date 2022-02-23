import "./ViewTutor.css";
import Header from "../Header/Header";
import React, { useState, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { useToasts } from "react-toast-notifications";
import {
  DELETE_USER,
  GET_ALL_TUTORS,
  GET_ALL_USERS,
} from "../../shared/constants";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import EditTutor from "../../components/EditTutor.js/EditTutor";
import ReactTable from "../../shared/data-table/react-table";
import moment from "moment";

const ViewTutor = () => {
  const [show, setShow] = useState(false);
  const [mydata, setData] = useState([]);
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

  // console.log(mydata)
  const { loading, data, error } = useQuery(GET_ALL_TUTORS, {
    onCompleted: () => {},
    onError: () => {},
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
        //window.location.reload()
      },
      refetchQueries: [{ query: GET_ALL_TUTORS }],
      awaitRefetchQueries: true,
    });

  const deleteModalOpenFunc = (id) => {
    setDeleteModalOpen(true);
    setUpdateId(id);
  };
  const deleteModalCloseFunc = () => {
    setDeleteModalOpen(false);
  };
  const deleteUser = () => {
    deleteUserMutation();
  };
  useEffect(() => {
    if (data) {
      console.log("all tutors", data.getAllTutors);
      setData(data.getAllTutors);
    }
  }, [data]);

  // const handleDelete = () => { };

  const AllTutorColumns = useMemo(
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
                  <h4 className="card-tital h4 mb-0">Tutor Details</h4>
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
              columns={AllTutorColumns}
              data={mydata}
              //filterValue={value}
              loading={loading}
            />
          </div>
        </div>
      </div>
      {show && (
        <EditTutor show={show} onHide={handleClose} tutorId={updateId} />
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

export default ViewTutor;
