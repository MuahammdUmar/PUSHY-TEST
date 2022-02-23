import React, { useCallback, useEffect, useMemo, useState } from "react";
//import google from '../images/google.jpg'
//import facebook from '../images/facebook.png'
import Header from "../Header/Header";
import CourseModal from "../../components/CourseCrud/CourseModal";
import {
  APPROVE_PAYMENT,
  DELETE_COURSE,
  GET_ALL_ADMIN_PAYMENTS,
  GET_ALL_SUBMITTED_PAYMENTS,
  REJECT_PAYMENT,
} from "../../shared/constants";
import { useMutation, useQuery } from "@apollo/client";
import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { useToasts } from "react-toast-notifications";
import ReactTable from "../../shared/data-table/react-table";
import {
  MdOutlineCheckCircleOutline,
  MdOutlineHighlightOff,
} from "react-icons/md";
import filePickerService from "../../shared/file-stack/file-picker.service";

const AllAdminPayments = () => {

  const [allPayments, setAllPayments] = useState([]);
  const { addToast } = useToasts();

  const { loading, data, error } = useQuery(GET_ALL_SUBMITTED_PAYMENTS, {
    onError: {
      // Do nothiing
    },
  });

  const [approvePayment] = useMutation(APPROVE_PAYMENT);
  const [rejectPayment] = useMutation(REJECT_PAYMENT);

  useEffect(() => {
    if (data) {
      console.log('data.getSubmittedPayments', data.getSubmittedPayments)
      setAllPayments(data.getSubmittedPayments);
    }
  }, [data]);

  const approve = (payid, studentId) => {

    console.log('id', payid)
    approvePayment({
      variables: { id: payid, studentId: studentId },
      onCompleted: () => {
        addToast("Review Approved Successfully", { appearance: "success" });
        //refetch();
      },
      refetchQueries: [{ query: GET_ALL_SUBMITTED_PAYMENTS }],
      awaitRefetchQueries: true,
    });
  };

  const reject = (payid, studentId) => {
    rejectPayment({
      variables: { id: payid, studentId: studentId },
      onCompleted: () => {
        addToast("Review Reject Successfully", { appearance: "success" });
      },
      refetchQueries: [{ query: GET_ALL_SUBMITTED_PAYMENTS }],
      awaitRefetchQueries: true,
    });
  };

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
      {
        Header: "Status",
        accessor: "Status",
      },
      {
        Header: "Price",
        accessor: "Price",
      },
      {
        Header: "Attachment",
        accessor: "Attachment",
        Cell: ({ row }) => {
          return (
            <>
              {row.original.Attachment &&
                row.original.Attachment.AttachmentFileHandle !== null && (
                  <a
                    href={filePickerService.getDownloadLink(
                      row.original.Attachment.AttachmentFileHandle
                    )}
                  >
                    {" "}
                    {row.original.Attachment.AttachmentFileName}
                  </a>
                )}
            </>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => {
          return (
            <>
              <button className="btn" onClick={() => approve(row.original.id, row.original.StudentId)}>
                <MdOutlineCheckCircleOutline
                  title="Approve"
                  fontSize={25}
                  fill="green"
                />
              </button>
              <button className="btn" onClick={() => reject(row.original.id, row.original.StudentId)}>
                <MdOutlineHighlightOff
                  title="Reject"
                  fontSize={25}
                  fill="red"
                />
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
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllAdminPayments;
