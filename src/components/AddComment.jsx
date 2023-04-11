import React from "react";

const AddComment = ({ type }) => {
  return (
    <article className="add-comment">
      <img
        className="add-comment__image"
        src="./images/avatars/image-amyrobson.png"
        alt="My Profile"
      />

      <textarea
        rows="4"
        cols="50"
        className="body add-comment__text"
        placeholder="Add a comment ..."
      ></textarea>
      <button className="btn btn--fill-blue">{type}</button>
    </article>
  );
};

export default AddComment;
