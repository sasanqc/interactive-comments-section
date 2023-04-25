import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../store/comment-slice";
const AddComment = ({ type }) => {
  const contentRef = useRef();
  const dispatch = useDispatch();
  const handleAddComment = () => {
    dispatch(addComment(contentRef.current.value));
  };
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
        ref={contentRef}
      ></textarea>
      <button className="btn btn--fill-blue" onClick={handleAddComment}>
        {type}
      </button>
    </article>
  );
};

export default AddComment;
