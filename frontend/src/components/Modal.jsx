import React from "react";
import "./Modal.css";

function Modal({ message, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">Order Confirmation</div>
        <div className="modal-body">
          {message.split("\n").map((line, index) => (
            <p key={index}>{line}</p> 
          ))}
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
