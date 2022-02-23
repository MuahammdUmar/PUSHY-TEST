import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AssignmentDetails.css";
import { BsThreeDots } from "react-icons/bs";
import {
  GET_COURSE_BY_ROLE,
  GET_STUDENT_ASSIGNMENT_BY_ID,
  GET_STUD_ASSIGNMENT_BY_ID,
  CREATE_STUDENT_ASSIGNMENT,
  GET_ASSIGN_BY_STU_ASSIGN,
  GET_STUD_ASSIGNMENT_BY_ID_STUD,
} from "../../shared/constants";
import { useMutation, useQuery } from "@apollo/client";
import Header from "../Header/Header";
import ImagePicker from "../../shared/file-stack/image-picker";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import FilePicker from "../../shared/file-stack/file-picker";
import filePickerService from "../../shared/file-stack/file-picker.service";
import PreviewDocument from "../../components/PreviewDocument/PreviewDocument";


const AssignmentDetails = (props) => {

  const { assignId } = props.history.location.state;
  const [studentAssignData, setStudentAssignData] = useState({});
  const [multiFiles, setMultitFiles] = useState({});
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false)
  const { addToast } = useToasts();
  const [updateIdPreview, setupdateIdPreview] = useState(0);
  const [previewShow, setPreviewshow] = useState(false);
  

  const [creatAssignment, { loading, error, data }] = useMutation(CREATE_STUDENT_ASSIGNMENT,{
      variables: {
        createStudentAssignmentInput: {
          AssignmentId: assignId,
          Attachment: multiFiles,
        },
      },
      onError: () => {
        //Do nothing
      },
      onCompleted: () => {
        addToast("Assignment uploaded successfully", { appearance: "success" });
        setAssignmentSubmitted(true)
        //refetch()
      },
    }
  );

  const { loading: loadingStuAssign, error: errorStuAssign, data: dataStudAssign, refetch} = useQuery(GET_STUD_ASSIGNMENT_BY_ID_STUD, {
    variables: { id: assignId },
    //skip: false,

    onCompleted: (alldata) => { },
    onError: () => {
      //Do nothing
    },
  });

  const uploadImageHandler = useCallback((files, id) => {
    //setAssignmentId(id)
    setMultitFiles(files);
  }, []);

  const submitHanlder = () => {
    if (Object.keys(multiFiles).length > 0) {
      creatAssignment();
    }
  };

  const handlepreviewShow = (id) => {
    // console.log("lllllllllllll",id)
    setupdateIdPreview(id);
    setPreviewshow(true);

  };
  const previewhandleClose = () => {
    
    setPreviewshow(false);
    setupdateIdPreview(0);
   
  };
 
  useEffect(() => {
    if (dataStudAssign) {
      console.log(
        "assignment details",
        dataStudAssign.getStudentAssignmentsById
      );
      setStudentAssignData(dataStudAssign.getStudentAssignmentsById);
    }
  }, [dataStudAssign]);

  if (loadingStuAssign)
    return (
      <div className="loading-indicator">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  return (
    <>
      <Header />
      <div className="Assign_nave p-4">
        <div className="container">
          <h2 className="text-white">Assignment Detail</h2>
        </div>
      </div>

      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8">
            <div className="Assign_title p-3 h-100">
              <div className="mt-3 ms-2 Assign_heading">
                <h4>{studentAssignData && studentAssignData.AssignmentName}</h4>
                <p className="text-black">
                  {studentAssignData && studentAssignData.Description}
                </p>
              </div>

              <hr className="Assign_hr ms-2" />
              <div className="text-right">
                {/* <div className="col-6">
                <ul className="list_info">
                  <li>
                    <span className="list_color w-35 d-inline-block">Subject:&nbsp;</span>
                    {studentAssignData && studentAssignData.CourseName}
                  </li>
                  <li>
                    <span className="list_color w-35 d-inline-block">Due Date:&nbsp;</span>
                    {studentAssignData &&
                      moment(studentAssignData.EndDate).format(
                        "DD MM YYYY hh:mm:ss A"
                      )}
                  </li>
                  <li>
                    <span className="list_color w-35 d-inline-block">Tutor:&nbsp;</span>
                    {studentAssignData &&
                      studentAssignData.Tutor &&
                      studentAssignData.Tutor.Firstname}
                  </li>
                  <li>
                    <span className="list_color w-35 d-inline-block">Attachments:&nbsp;</span>
                    {studentAssignData &&
                    studentAssignData.Attachment !== null ? (
                      <a
                        href={filePickerService.getDownloadLink(
                          studentAssignData &&
                            studentAssignData.Attachment &&
                            studentAssignData.Attachment.AttachmentFileHandle
                        )}
                      >
                        {studentAssignData &&
                          studentAssignData.Attachment &&
                          studentAssignData.Attachment.AttachmentFileName}
                      </a>
                    ) : (
                      "No attatchment found"
                    )}
                  </li>
                </ul>
              </div> */}

                <div className="row text-right">
                  <div className="col-6">
                    <ul className="list_info">
                      <li>
                        <span className="list_color w-35 d-inline-block">
                          Subject:&nbsp;
                        </span>
                        <span>
                          {studentAssignData && studentAssignData.CourseName}
                        </span>
                      </li>
                      <li>
                        <span className="list_color w-35 d-inline-block">
                          Due Date:&nbsp;
                        </span>
                        <span>
                          {studentAssignData &&
                            moment(studentAssignData.EndDate).format(
                              "DD MM YYYY hh:mm:ss A"
                            )}
                        </span>
                      </li>
                      <li>
                        <span className="list_color w-35 d-inline-block">
                          Tutor:&nbsp;
                        </span>
                        <span>
                          {studentAssignData &&
                            studentAssignData.Tutor &&
                            studentAssignData.Tutor.Firstname}
                        </span>
                      </li>
                      <li>
                        <span className="list_color w-35 d-inline-block">
                          Attachments:&nbsp;
                        </span>
                        {studentAssignData && studentAssignData.Attachment !== null ? (
                          // <a
                          //   href={filePickerService.getDownloadLink(
                          //     studentAssignData && studentAssignData.Attachment && studentAssignData.Attachment.AttachmentFileHandle
                          //   )}
                          // >
                          //   {studentAssignData && studentAssignData.Attachment && studentAssignData.Attachment.AttachmentFileName}
                          // </a>
                          <button  onClick={() => handlepreviewShow(studentAssignData.Attachment.AttachmentId)} className="dropdown-item" href="#">
                          Preview
                        </button>
                        ) : (
                          "No attatchment found"
                        )}
                      </li>
                      <li>
                        <span className="list_color d-inline-block">
                          Student Attachment:&nbsp;
                        </span>
                        {studentAssignData && studentAssignData.StudentAttachment !== null ? (
                          <button  onClick={() => handlepreviewShow(studentAssignData.StudentAttachment.AttachmentId)} className="dropdown-item" href="#">
                          Preview
                        </button>
                        ) : (
                          "No attatchment found"
                        )}
                      </li>
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul className="right_list">
                      <li>
                        <span className="list_color w-35 d-inline-block">
                          Total Points:
                        </span>
                        <span>
                          {studentAssignData && studentAssignData.TotalMarks
                            ? studentAssignData.TotalMarks
                            : 0}
                        </span>
                      </li>
                      <li>
                        <span className="list_color w-35 d-inline-block">
                          Obtain Points:
                        </span>
                        <span>
                          {studentAssignData && studentAssignData.ObtainedMarks
                            ? studentAssignData.ObtainedMarks
                            : 0}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <hr className="Assign_hr" />

                <div className="row">
                  <ul className="butt_list">
                    <li>
                      <FilePicker
                        data={multiFiles}
                        afterUpload={uploadImageHandler}
                        label={"Upload Assignment"}
                      />
                    </li>

                    <li>
                      <button
                        type="button"
                        className="btn Ask_but"
                        onClick={submitHanlder}
                        disabled={assignmentSubmitted}
                      >
                        Submit Assignment
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="T_comments p-3 h-100">
              <h4 className="mt-3">Tutor Comments</h4>
              <p className="text-black">
                {studentAssignData &&
                  studentAssignData.TutorComment !== null &&
                  studentAssignData.TutorComment}
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 Tut_Head">
            <h5>Discussion with Tutor (Q&A)</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 ">
            <div className="qury_title mb-3">
              <div className="first_qury p-2">
                <h5 className="m-0">First Query Title goes here...</h5>
              </div>

              {/* <div className="first_qury"><h5 className="mt-1">First Query Title goes here...</h5></div> */}
              <div className="p-2">
                <p>
                  The Program Prepares Grads for Leadership Roles within
                  Mission-Driven Organizations. Students Become Conversant with
                  New Technologies, Digital Media, & Data Analytics.
                  Graduate-Level Study.Advance Your Career Today With A Master's
                  Degree At Gies College Of Business. Which Graduate Program Is
                  Right For You. With A Master's Degree At Gies College Of
                  Business. Which Graduate Program Is Right For You.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sec_row mb-3 p-2">
          <h5 className="m-0">Second Query Title goes here...</h5>
        </div>

        <div className="sec_row mb-3 p-2">
          <h5 className="m-0">Third Query Title goes here...</h5>
        </div>

        <div className="sec_row mb-3 p-2">
          <h5 className="m-0">Fourth Query Title goes here...</h5>
        </div>
      </div>
      <PreviewDocument
        show={previewShow}
         onHide={previewhandleClose}
        documentId={updateIdPreview}
       // ducumenttypeid={props.documentTypeId}
      />
    </>
  );
};
export default AssignmentDetails;
