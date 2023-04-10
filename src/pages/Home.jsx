import React from "react";

import Comment from "../components/Comment";
import data from "../data.json";
import AddComment from "../components/AddComment";
const Home = () => {
  const Comments = data.comments.map((el) => (
    <Comment comment={el} currentUser={data.currentUser} key={el.id} />
  ));
  return (
    <main className="home">
      {Comments}
      <AddComment />
    </main>
  );
};

export default Home;
