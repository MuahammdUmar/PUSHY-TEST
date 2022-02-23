import { PickerOverlay } from 'filestack-react'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FILE_STACK } from '../constants'

const MultiFilePicker = (props) => {
  const [btnLabel, setBtnLabel] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const [options, setOptions] = useState({
    maxFiles: 500,
    fromSources: ['local_file_system'],
    onClose: () => {
      setShowPicker(false)
    },
  })
  const security = { security: { policy: FILE_STACK.filePickerApi.policy, signature: FILE_STACK.filePickerApi.signature } };
  const apiKey = FILE_STACK.filePickerApi.key

  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(props.data ? props.data : [])
    setBtnLabel(props.label ? props.label : 'upload doc')
    setOptions(Object.assign({}, options, props.options ? props.options : {}))
  }, [props])

  const onUploadDone = (fileData) => {
    let newFiles = [...files];
    fileData.filesUploaded.map(function (file) {
      var fileAdded = newFiles.find(x => x.AttachmentFileHandle == file.handle);
      if (!fileAdded) {
        newFiles.push({
          AttachmentId: null,
          AttachmentFileHandle: file.handle,
          AttachmentFileName: file.filename,
          AttachmentFileSize: file.size,
          AttachmentFileType: file.mimetype,
        });
      }

    });
    setFiles(newFiles)
    setShowPicker(false)
    props.afterUpload(newFiles)
  }

  const remove = (key, e) => {
    e.preventDefault()
    // let newFiles = files.slice(0, key);
    let newFiles = files.filter(function (value, index) {
      return index != key;
    });
    setFiles(newFiles);
    props.afterUpload(newFiles);
  }

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

      <Button className="simple-btn"  size="small" onClick={() => setShowPicker(true)}>
        {btnLabel}
      </Button>
      {files.length > 0 && files.map((file, index) => {
        return (
          <>
            <div>
              {/* <Chip
                label={file.AttachmentFileName}
                style={{ marginTop: '10px' }}
                onDelete={(e) => remove(index, e)}
                variant="outlined"
              /> */}
            </div>
          </>
        )
      })}
    </>
  );
}

export default MultiFilePicker
