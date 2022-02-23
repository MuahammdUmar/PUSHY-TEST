import { PickerOverlay } from "filestack-react";
import React, { useEffect, useState } from "react";
import { FILE_STACK } from "../constants";
import filePickerService from "./file-picker.service";
import Image from "react-bootstrap/Image";
import { Button, Badge } from "react-bootstrap";
import { FaWindowClose } from 'react-icons/fa';


const ImagePicker = (props) => {
  const [btnLabel, setBtnLabel] = useState("Upload");
  const [showPicker, setShowPicker] = useState(false);
  const [options, setOptions] = useState({
    accept: "image/*",
    maxFiles: 1,
    maxSize: 25 * 1024 * 1024,

    fromSources: ["local_file_system"],
    onClose: () => {
      setShowPicker(false);
    },
  });

  const security = {
    security: {
      policy: FILE_STACK.filePickerApi.policy,
      signature: FILE_STACK.filePickerApi.signature,
    },
  };
  const apiKey = FILE_STACK.filePickerApi.key;

  const [image, setImage] = useState({});

  useEffect(() => {
    setImage(props.data ? props.data : {});
    setBtnLabel(props.label ? props.label : "Upload Image");
    setOptions(Object.assign({}, options, props.options ? props.options : {}));
  }, [props]);

  const onUploadDone = (files) => {
    let newImage = {};
    if (files.filesUploaded[0].handle !== image.AttachmentFileHandle) {
      newImage = {
        AttachmentId: null,
        AttachmentFileHandle: files.filesUploaded[0].handle,
        AttachmentFileName: files.filesUploaded[0].filename,
        AttachmentFileSize: files.filesUploaded[0].size,
        AttachmentFileType: files.filesUploaded[0].mimetype,
      };
    }
    setImage(newImage);
    setShowPicker(false);
    props.afterUpload(newImage);
  };

  const remove = (e) => {
    e.preventDefault();
    setImage({});
    props.afterUpload({});
  };

  return (
    <>
      {showPicker && (
        <PickerOverlay
          apikey={apiKey}
          pickerOptions={options}
          clientOptions={security}
          onSuccess={onUploadDone}
        />
      )}
      <div
        className="card"
        style={{ textAlign: "center", position: "relative" }}
      >
        {(Object.entries(image).length !== 0 && props.avatar) ? (
        
            <div className="card-body">
              <div className="justify-content-center d-flex w-100 mb-3">
                <div className="profile-img">
                  <img
                    src={filePickerService.getSmallImage(
                      image.AttachmentFileHandle
                    )}
                    alt="Place title"
                  />
                </div>
              </div>

              <button
                className="btn btn-danger text-white btn-sm"
                onClick={(e) => remove(e)}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          
        ) : props.avatar && (
          <div className="card-body">
            <div className="justify-content-center d-flex w-100">
              <div className="profile-img">
                <Image
                  src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png"
                  roundedCircle
                />
              </div>
            </div>
          </div>
        ) 
        }
        {(Object.entries(image).length !== 0 && !props.avatar) && (
           <div className="mb-2">
           <Badge className="btn rounded-pill btn-primary btn-xs text-white m-0 font-normal">
             {image.AttachmentFileName}
           </Badge>
           <button className="btn btn-xs" onClick={() => remove()}>
             <FaWindowClose />
           </button>
       </div>
        )}
       

        <Button onClick={() => setShowPicker(true)}>{btnLabel}</Button>
      </div>
    </>
  );
};

export default ImagePicker;
