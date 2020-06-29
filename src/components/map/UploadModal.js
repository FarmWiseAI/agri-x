import React from "react";
import PropTypes from "prop-types";
import { Upload, Modal, message, Icon } from "antd";
import './styles/dropzone.scss';

const { Dragger } = Upload;

const UploadModal = ({ open, close }) => {
  const props = {
    name: 'file',
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Modal
      title="Import"
      visible={open}
      onCancel={close}
      footer={null}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload of <b>Excel and JSON</b> file types only. Strictly prohibit from uploading company data or other
          band files.
    </p>
      </Dragger>
    </Modal>
  );
};

UploadModal.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func
};

export default UploadModal;
