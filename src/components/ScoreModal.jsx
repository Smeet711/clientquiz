// Modal.js
import React from 'react';

const ScoreModal = ({ isOpen, closeModal, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
        {content}
      </div>
    </div>
  );
};

export default ScoreModal;
