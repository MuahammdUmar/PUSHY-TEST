import React, { useCallback, useEffect, useMemo, useState } from "react";
//import google from '../images/google.jpg'
//import facebook from '../images/facebook.png'
import Header from "../Header/Header";
import CourseModal from "../../components/CourseCrud/CourseModal";
import {
  APPROVE_LEAVE,
  DELETE_COURSE,
  GET_ALL_ADMIN_PAYMENTS,
  GET_STUDENT_LEAVE_APPLICATIONS,
  REJECT_LEAVE,
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

const StudentLeaves = () => {

  const [allLeaves, setAllLeaves] = useState([]);
  const { addToast } = useToasts();

  const { loading, data, error } = useQuery(GET_STUDENT_LEAVE_APPLICATIONS, {
    onError: {
      // Do nothiing
    },
  });

  const [approveLeave] = useMutation(APPROVE_LEAVE);
  const [rejectLeave] = useMutation(REJECT_LEAVE);

 

  const approve = (payid) => {

    console.log('id', payid)
    approveLeave({
      variables: { id: payid},
      onCompleted: () => {
        addToast("Review Approved Successfully", { appearance: "success" });
        //refetch();
      },
      refetchQueries: [{ query: GET_STUDENT_LEAVE_APPLICATIONS }],
      awaitRefetchQueries: true,
    });
  };

  const reject = (payid) => {
    rejectLeave({
      variables: { id: payid},
      onCompleted: () => {
        addToast("Review Reject Successfully", { appearance: "success" });
      },
      refetchQueries: [{ query: GET_STUDENT_LEAVE_APPLICATIONS }],
      awaitRefetchQueries: true,
    });
  };

  useEffect(() => {
    if (data) {
      console.log('data.getStudentLeaveApplications', data.getStudentLeaveApplications)
      setAllLeaves(data.getStudentLeaveApplications);
    }
  }, [data]);

  const AllPaymentsColumns = useMemo(
    () => [
     {
        Header: "Student Name",
        accessor: "Student",
        Cell: ({ row }) => {
          return (
            <>
              {row.original.Student && 
                row.original.Student.Firstname
              }
            </>
          );
        },
      },
      {
        Header: "Course Name",
        accessor: "Course",
        Cell: ({ row }) => {
          return (
            <>
              {row.original.Course && 
                row.original.Course.CourseName
              }
            </>
          );
        },
      },
      {
        Header: "Course Timing",
        accessor: "CourseTiming",
      },
      {
        Header: "Start Date",
        accessor: "StartTime",
      },
      {
        Header: "End Date",
        accessor: "EndTime",
      },
      {
        Header: "Reason",
        accessor: "AbsentReason",
      },
      {
        Header: "Status",
        accessor: "Status",
      },
      // {
      //   Header: "Price",
      //   accessor: "Price",
      // },
      // {
      //   Header: "Attachment",
      //   accessor: "Attachment",
      //   Cell: ({ row }) => {
      //     return (
      //       <>
      //         {row.original.Attachment &&
      //           row.original.Attachment.AttachmentFileHandle !== null && (
      //             <a
      //               href={filePickerService.getDownloadLink(
      //                 row.original.Attachment.AttachmentFileHandle
      //               )}
      //             >
      //               {" "}
      //               {row.original.Attachment.AttachmentFileName}
      //             </a>
      //           )}
      //       </>
      //     );
      //   },
      // },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => {
          return (
            <>
              <button className="btn" onClick={() => approve(row.original.id)}>
                <MdOutlineCheckCircleOutline
                  title="Approve"
                  fontSize={25}
                  fill="green"
                />
              </button>
              <button className="btn" onClick={() => reject(row.original.id)}>
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
                  <h4 className="card-tital h4 mb-0">Student Leave Details</h4>
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
              data={allLeaves}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLeaves;
