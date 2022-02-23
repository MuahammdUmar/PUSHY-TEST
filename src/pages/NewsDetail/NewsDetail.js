import React, { useState, useCallback, useEffect, useMemo } from "react";
import "./NewsDetail.css";
import { DELETE_USER, GET_ALL_NEWS, DELETE_NEWS } from "../../shared/constants";
import { useMutation, useQuery } from "@apollo/client";
import ReactTable from "../../shared/data-table/react-table";
import { useToasts } from "react-toast-notifications";
import AddNews from "../AddNews/AddNews";
import EditNews from "../EditNews/EditNews";

import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import Header from "../Header/Header";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const NewsDetail = (props) => {
  const [show, setShow] = useState(false);
  const [mydata, setData] = useState([]);
  const [formType, setFormType] = useState(0);
  const [Addhandleshow, setAddhandleshow] = useState(false);
  const [allNews, setAllNews] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { addToast } = useToasts();
  const [updateId, setUpdateId] = useState(0);
  const [openAssignmentModal, setOpenAssignmentModal] = useState(false);
  const [assignmentId, setAssignmentId] = useState(0);
  const { loading, data, error, refetch } = useQuery(GET_ALL_NEWS, {
    onError: {
      // Do nothiing
    },
  });

  const [deleteNewsMutation, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_NEWS, {
      onError: () => {
        //setDeleteDialogOpen(false)
      },
      variables: {
        id: updateId,
      },
      onCompleted: () => {
        addToast("News Deleted Successfully", { appearance: "success" });
        setDeleteModalOpen(false);
        //window.location.reload()
      },
      refetchQueries: [{ query: GET_ALL_NEWS }],
      awaitRefetchQueries: true,
    });
  const deleteNews = () => {
    deleteNewsMutation();
  };

  //const { error, loading, data, refetch } = useQupery();
  useEffect(() => {
    if (data) {
      console.log('data.getSubmittedNews', data.getAllNews)
      setAllNews(data.getAllNews);
    }
  }, [data]);


  const handleShow = (id) => {
    setUpdateId(id);
    setShow(true);
  };
  const AddhandleClose = (type) => {
    setAddhandleshow(false);
    if (type === "update") {
      refetch();
    }

    // setUpdateId(0);
  };
  const handleClose = (type) => {
    setShow(false);
    setUpdateId(0);
    if (type === "update") {
      refetch();
    }
  };
  const AddhandleShow = (id) => {
    // setUpdateId(id);
    setAddhandleshow(true);
  };
  const deleteModalOpenFunc = (id) => {
    setDeleteModalOpen(true);
    setUpdateId(id);
  };
  const deleteModalCloseFunc = () => {
    setDeleteModalOpen(false);
  };
  const openAssignmentModalFunc = useCallback((id, type) => {
    setFormType(type);
    setAssignmentId(id);
    setOpenAssignmentModal(true);
  }, []);
  const AllNewsColumns = useMemo(() => [
    {
      Header: "Title",
      accessor: "Title",
    },
    {
      Header: "Description",
      accessor: "Description",
    },
    {
      Header: "NewsType",
      accessor: "NewsType",

    },
    {
      Header: "Actions",
      accessor: "id",
      Cell: ({ row }) => {

        return (
          <>
            <button className="btn" onClick={() => handleShow(row.original.id)}><MdOutlineModeEditOutline fontSize={25} fill="yellow" /></button>
            <button className="btn" onClick={() => deleteModalOpenFunc(row.original.id)}><MdOutlineDeleteOutline fontSize={25} fill="red" /></button>
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



      <div class="container-xl ">
        <div class="table-responsive tableRes">
          <div class="table-wrapper tableWrap">
            <div class="table-title tableTitle">
              <div class="row">
                <div className="col-sm-4 mt-3">
                  <h2 className="ms-3">
                    <b>News Details</b>
                  </h2>
                </div>
                <div className="col-sm-5">
                  <div className="add_butt">
                    <button onClick={() => AddhandleShow(document.id)} className="btn add_btn btn-primary rounded">Add </button>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="search-box searchBox mt-3 me-3">
                    <i class="material-icons">&#xE8B6;</i>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search&hellip;"
                    />
                  </div>
                </div>
              </div>
            </div>

            <ReactTable
              columns={AllNewsColumns}
              data={allNews}
              //  filterValue={value}
              loading={loading}
            />
            <AddNews
              show={Addhandleshow}
              onHide={AddhandleClose}
              ducumenttypeid={props.documentTypeId}
            />
            {show && (
              <EditNews show={show} onHide={handleClose} newsId={updateId} />)}
            {deleteModalOpen && (
              <DeleteModal
                show={deleteModalOpen}
                onHide={deleteModalCloseFunc}
                deleteRecord={deleteNews}
              />
            )}
          </div>
        </div>
      </div>

    </>
  );
}

export default NewsDetail;
