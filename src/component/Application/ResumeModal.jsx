import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal w-50 mx-auto">
      <div className="modal-content">
        <span className="close h2 w-25" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" />
      </div>
    </div>
  );
};

export default ResumeModal;
