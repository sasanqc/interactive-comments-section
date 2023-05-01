import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, replyComment } from "../store/comment-slice";
const AddComment = ({ type, replyTo }) => {
  const contentRef = useRef();
  const user = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const handleAddComment = () => {
    if (type === "send") dispatch(addComment(contentRef.current.value));
    if (type === "reply")
      dispatch(replyComment(replyTo, contentRef.current.value));
  };
  return (
    <article className="add-comment">
      <img
        className="add-comment__image"
        src={`./images/avatars/${user.image?.png}`}
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
