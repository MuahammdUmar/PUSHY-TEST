import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup, Spinner } from "react-bootstrap";
import UploadAssignment from "../../components/UploadAssignment/UploadAssignment";
import {
  GET_STUDENTS_ASSIGNMENTS,
  GET_STUDENTS_ASSIGNMENTS_NEW,
} from "../../shared/constants";
import Header from "../Header/Header";
import "./StudentAssignment.css";
import moment from "moment";
import { Link } from "react-router-dom";
import filePickerService from "../../shared/file-stack/file-picker.service";
import PreviewDocument from "../../components/PreviewDocument/PreviewDocument";


const StudentAssignment = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [allStudentAssignments, setAllStudentAssignments] = useState([]);
  const [updateIdPreview, setupdateIdPreview] = useState(0);
  const [previewShow, setPreviewshow] = useState(false);

  const {
    loading: loadingStuAssigns,
    data: dataStuAssigns,
    error: errorStuAssigns,
  } = useQuery(GET_STUDENTS_ASSIGNMENTS_NEW, {
    //variables: { id: user && user.id},
    //skip: true,
    onCompleted: () => {},
    onError: () => {
      //
    },
  });

  const openUploadModal = () => {
    setUploadModalOpen(true);
  };
  const closeUploadModal = () => {
    setUploadModalOpen(false);
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
    if (dataStuAssigns) {
      console.log(
        "student assignments",
        dataStuAssigns.getCurrnetStudentAssignments
      );

      //setAllStudentAssignments(dataStuAssigns.getStudentAssignments)
      setAllStudentAssignments(dataStuAssigns.getCurrnetStudentAssignments);
    }
  }, [dataStuAssigns]);
  return (
    <>
      <Header />
      <section className="assignment--title">
        <div className="container text-white">
          <h3>Assignments</h3>
          <h5>
            <i>Upcoming Assignments</i>
          </h5>
        </div>
      </section>
      {loadingStuAssigns && (
        <div className="loading-indicator">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <section className="assignment--listing">
        <div className="assignment--listing-cards container">
          {!loadingStuAssigns &&
            allStudentAssignments.map((assign) => {
              return (
                <Card key={assign.id}>
                  <Card.Header>
                    <Card.Title>{assign.AssignmentName}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <h5>{assign.Description}</h5>

                    <ListGroup>
                      <ListGroup.Item variant="light">
                        <h6>Subject:&nbsp;</h6>
                        {assign.CourseName}
                      </ListGroup.Item>
                      <ListGroup.Item variant="light">
                        <h6>Due Date:&nbsp;</h6>
                        {moment(assign.EndDate).format("DD/MM/YYYY hh:mm:ss A")}
                      </ListGroup.Item>
                      <ListGroup.Item variant="light">
                        <h6>Tutor:&nbsp;</h6>
                        {assign.Tutor && assign.Tutor.Firstname}
                      </ListGroup.Item>
                      <ListGroup.Item variant="light">
                        <h6>Attatchment:&nbsp;</h6>
                        {assign.Attachment !== null ? (
                          // <a
                          //   href={filePickerService.getDownloadLink(
                          //     assign.Attachment.AttachmentFileHandle
                          //   )}
                          // >
                          //   {assign.Attachment.AttachmentFileName}
                          // </a>
                          <button  onClick={() => handlepreviewShow(assign.Attachment.AttachmentId)} className="dropdown-item" href="#">
                          Preview
                        </button>
                        ) : (
                          "No attatchment found"
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>

                  <Card.Footer className="justify-content-end d-flex">
                    <Link
                      class="alert-link"
                      className="btn btn-primary text-decoration-none"
                      to={{
                        pathname: "/assignmentdetails",
                        state: { assignId: assign.id },
                      }}
                    >
                      View Details
                    </Link>
                  </Card.Footer>
                </Card>
              );
            })}
        </div>
      </section>
      <UploadAssignment show={uploadModalOpen} onHide={closeUploadModal} />
      <PreviewDocument
        show={previewShow}
         onHide={previewhandleClose}
        documentId={updateIdPreview}
       // ducumenttypeid={props.documentTypeId}
      />
    </>
  );
};
export default StudentAssignment;
