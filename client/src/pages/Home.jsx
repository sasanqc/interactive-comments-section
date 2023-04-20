import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../components/Comment";
import data from "../data.json";
import AddComment from "../components/AddComment";
import { getAllComments, voteComment } from "../store/comment-slice";

const Home = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  const handleVote = (id, score) => {
    dispatch(voteComment(id, score));
  };
  return (
    <main className="home">
      {comments.items.map((el) => (
        <Comment
          comment={el}
          currentUser={data.currentUser}
          key={el.id}
          voteComment={handleVote}
        />
      ))}

      <AddComment type={"send"} />
    </main>
  );
};

export default Home;
