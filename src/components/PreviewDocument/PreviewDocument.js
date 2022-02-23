import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from 'react-router-dom'
import {
  GET_USER_ID,
  UPDATE_USER,
  UPDATE_DOCUMENT,
  GET_DOCUMENT_BY_ID,
  CREATE_CLIENT_DOCUMENT,
  ATTACHMENT_BY_ID,
  GET_DOCUMENT_CONTENT,
} from "../../shared/constants";
import { useToasts } from "react-toast-notifications";
import MultiFilePicker from "../../shared/file-stack/multi-file-picker";
import filePickerService from "../../shared/file-stack/file-picker.service";

import DocViewer, { PDFRenderer, PNGRenderer, DocViewerRenderers } from "react-doc-viewer";
// import CreatePDF from "../../User Contracts & Documents/CreatePDF/CreatePDF";

// import { FaCamera } from 'react-icons/fa'

const PreviewDocument = (props) => {

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Payment, setPayment] = useState("");
  const [Language, setLanguage] = useState("");
  const [Attachementhandle, setAttachementhandle] = useState("");

  
  const [show, setShow] = useState(false);
  const [onHide, setOnHide] = useState(props.onHide);

  const {
    data: dataUser,
  } = useQuery(ATTACHMENT_BY_ID, {
    variables: { AttachmentId: props && props.documentId },
    skip: props && props.documentId === 0,
    onError: () => {
      props.onHide();
    },
  });
                                                        
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (id) => {
    setOnHide(props.onHide)
    setShow(true);
  };

  useEffect(() => {
   

    if (dataUser) {
      console.log("kkkkkkkkkkkkkkkkk",dataUser)
      // setTitle(dataUser.DocumentsById.Title);
      // setDescription(dataUser.DocumentsById.Description);
      // setPayment(dataUser.DocumentsById.Payments);
      // setLanguage(dataUser.DocumentsById.Language);
      setAttachementhandle(
        dataUser.attachmentById.AttachmentFileHandle
        // dataUser.DocumentsById.Description
      );
    
    }
  }, [dataUser]);


  const docs = [
    { uri: filePickerService.getDownloadLink(Attachementhandle) },
  ];

  return (
    <>
      <Modal
        show={props.show}
        onHide={onHide}
        animation={false}
        size="lg"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="container">
          
            
              <div className="row mt-3">
                <Link>
                  <div style={{ height: '300px' }}>
                    <DocViewer
                      // pluginRenderers={[PDFRenderer, PNGRenderer]}
                      pluginRenderers={DocViewerRenderers}
                      documents={docs}
                      theme={{
                        disableThemeScrollbar: true,
                      }}
                    />
                  </div>
                </Link>

              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
      {/* <CreatePDF show={show} onHide={handleClose} Attachementhandle={Attachementhandle} DocumentTypeId={props.ducumenttypeid}  /> */}
    </>
  );
};

export default PreviewDocument;
