import { PickerOverlay } from 'filestack-react'
import React, { useEffect, useState } from 'react'
import { Button, Badge } from "react-bootstrap"
import { FILE_STACK } from '../constants'
import { FaWindowClose } from 'react-icons/fa';


const FilePicker = (props) => {
  const [btnLabel, setBtnLabel] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [options, setOptions] = useState({
    maxFiles: 1,
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

  const [file, setFile] = useState({});

  useEffect(() => {
    setFile(props.data ? props.data : {});
    setBtnLabel(props.label ? props.label : "Upload");
    setOptions(Object.assign({}, options, props.options ? props.options : {}));
  }, [props]);

  const onUploadDone = (files) => {
    let newFile = {};
    if (files.filesUploaded[0].handle !== file.handle) {
      newFile = {
        AttachmentId: null,
        AttachmentFileHandle: files.filesUploaded[0].handle,
        AttachmentFileName: files.filesUploaded[0].filename,
        AttachmentFileSize: files.filesUploaded[0].size,
        AttachmentFileType: files.filesUploaded[0].mimetype,
      };
    }
    setFile(newFile);
    setShowPicker(false);
    props.afterUpload(newFile);
  };

  const remove = () => {
    setFile({});
    props.afterUpload({});
  };

  return (
    <>
      {showPicker && (
        <PickerOverlay
          apikey={apiKey}
          pickerOptions={options}
          onSuccess={onUploadDone}
          clientOptions={security}
        />
      )}

      {Object.entries(file).length !== 0 && (
        <>
          <div className="mb-2">
            {/* <Chip
              label={file.AttachmentFileName}
              style={{ marginTop: '10px' }}
              onDelete={() => remove()}
              variant="outlined"
            /> */}
            <Badge className="btn rounded-pill btn-primary btn-xs text-white m-0 font-normal">
              {file.AttachmentFileName}
            </Badge>
            <button className="btn btn-xs" onClick={() => remove()}>
              <FaWindowClose />
            </button>
          </div>
        </>
      )}
      <Button onClick={() => setShowPicker(true)}>{btnLabel}</Button>
    </>
  );
};

export default FilePicker;
