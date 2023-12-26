import React, { useState } from "react";
import { Modal, Upload, message } from "antd";
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";

import "../styles/CustomModal.css";

export default function CustomModal({ modalOpen, setModalOpen }) {
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file) => {
    setFileList([...fileList, file]);
    return false; // Prevent default upload behavior
  };

  const removeFile = (file) => {
    const newFileList = fileList.filter((item) => item !== file);
    setFileList(newFileList);
  };

  const uploadProps = {
    beforeUpload,
    onRemove: removeFile,
    fileList,
  };

  const handleOk = () => {
    // Implement logic to handle file upload here
    message.success("File uploaded successfully!");
    setModalOpen(false);
  };

  const handleCancel = () => {
    setFileList([]);
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Upload FIR"
        centered
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Upload {...uploadProps} className="uploadButton">
          <DriveFolderUploadRoundedIcon sx={{ fontSize: 100 }} />
          <div className="upload-text">Choose File</div>
        </Upload>
      </Modal>
    </>
  );
}
