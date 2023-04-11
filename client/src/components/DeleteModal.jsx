import React from "react";

const DeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="error-modal">
      <h1 className="heading-l error-modal__title">Delete comment</h1>
      <p className="body error-modal__text">
        Are you sure you want to delete this comment? This will remove the
        comment and can’t be undone.
      </p>
      <div className="error-modal__btns body-m">
        <button
          className="btn error-modal__btn error-modal__btn--no"
          onClick={onCancel}
        >
          no, cancel
        </button>
        <button
          className="btn error-modal__btn error-modal__btn--yes"
          onClick={onConfirm}
        >
          yes, delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
