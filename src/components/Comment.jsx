import React from "react";
import { ReactComponent as ReplyIcon } from "../asstes/icons/icon-reply.svg";
import { ReactComponent as MinusIcon } from "../asstes/icons/icon-minus.svg";
import { ReactComponent as PlusIcon } from "../asstes/icons/icon-plus.svg";
const Comment = ({ comment, currentUser }) => {
  return (
    <article className="comment">
      <div className="comment__container">
        <div className="comment__vote">
          <PlusIcon />
          <p className="heading-m">{comment.score}</p>
          <MinusIcon />
        </div>
        <div className="comment__details">
          <div className="comment__header">
            <img
              src={comment.user.image.png}
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
            <button className="btn btn--blue">
              <ReplyIcon />
              Reply
            </button>
          </div>
          <p className="body comment__text">{comment.content}</p>
        </div>
      </div>
      {comment.replies?.length > 0 && (
        <div className="comment__container">
          <div className="comment__vertical-line"></div>
          <div>
            {comment.replies.map((el) => (
              <Comment
                comment={el}
                currentUser={currentUser}
                key={el.id}
              ></Comment>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default Comment;
