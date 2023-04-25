import React, { Fragment, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as ReplyIcon } from "../asstes/icons/icon-reply.svg";
import { ReactComponent as MinusIcon } from "../asstes/icons/icon-minus.svg";
import { ReactComponent as PlusIcon } from "../asstes/icons/icon-plus.svg";
import { ReactComponent as DeleteIcon } from "../asstes/icons/icon-delete.svg";
import { ReactComponent as EditIcon } from "../asstes/icons/icon-edit.svg";

import AddComment from "./AddComment";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";
import { deleteComment } from "../store/comment-slice";
import { updateComment } from "../store/comment-slice";
const Comment = ({ comment }) => {
  const contentRef = useRef();
  const [state, setState] = useState();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.userInfo);

  const handleConfirmDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  const handleAddVote = () => {
    dispatch(updateComment(comment.id, { score: comment.score + 1 }));
  };

  const handleDecreaseVote = () => {
    dispatch(updateComment(comment.id, { score: comment.score - 1 }));
  };
  const handleUpdateComment = () => {
    dispatch(updateComment(comment.id, { content: contentRef.current.value }));
    setState(null);
  };
  return (
    <article className="comment">
      {state === "delete" && (
        <Modal onBackdropClicked={() => setState(null)}>
          <DeleteModal
            onCancel={() => setState("null")}
            onConfirm={handleConfirmDelete}
          />
        </Modal>
      )}
      <div className="comment__container">
        <div className="comment__vote">
          <PlusIcon onClick={handleAddVote} />
          <p className="heading-m">{comment.score}</p>
          <MinusIcon onClick={handleDecreaseVote} />
        </div>
        <div className="comment__details">
          <div className="comment__header">
            <img
              src={`./images/avatars/${comment.user.image.png}`}
              alt="User Avatar"
              className="comment__image"
            />
            <h2 className="heading-m comment__username">
              {comment.user.username}
              {currentUser.username === comment.user.username && (
                <span className="comment__you">you</span>
              )}
            </h2>

            <p className="body comment__date">{comment.createdAt}</p>
            <div className="comment__btns">
              {currentUser.username !== comment.user.username && (
                <button
                  className="btn btn--blue"
                  onClick={() => setState("reply")}
                >
                  <ReplyIcon />
                  Reply
                </button>
              )}
              {currentUser.username === comment.user.username && (
                <Fragment>
                  <button
                    className="btn btn--red"
                    onClick={() => setState("delete")}
                  >
                    <DeleteIcon />
                    Delete
                  </button>
                  <button
                    className="btn btn--blue"
                    onClick={() => setState("edit")}
                  >
                    <EditIcon />
                    Edit
                  </button>
                </Fragment>
              )}
            </div>
          </div>
          {state === "edit" && (
            <Fragment>
              <textarea
                className="body comment__textarea"
                defaultValue={comment.content}
                ref={contentRef}
              />

              <div className="comment__update-btn">
                <button
                  className="btn btn--fill-blue"
                  onClick={handleUpdateComment}
                >
                  update
                </button>
              </div>
            </Fragment>
          )}
          {state !== "edit" && (
            <p className="body comment__text">{comment.content}</p>
          )}
        </div>
      </div>
      {state === "reply" && <AddComment type={"reply"} />}

      {comment.replies?.length > 0 && (
        <div className="comment__container">
          <div className="comment__vertical-line"></div>
          <div>
            {comment.replies.map((el) => (
              <Comment comment={el} key={el.id} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default Comment;
