import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../components/Comment";

import AddComment from "../components/AddComment";
import { getAllComments } from "../store/comment-slice";

const Home = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  return (
    <main className="home">
      {comments.items.map((el) => (
        <Comment comment={el} key={el.id} />
      ))}

      <AddComment type={"send"} />
    </main>
  );
};

export default Home;
