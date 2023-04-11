import React, { useEffect, useCallback, useState } from "react";

import Comment from "../components/Comment";
import data from "../data.json";
import AddComment from "../components/AddComment";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleFetchComments = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data.results);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    handleFetchComments();

    return () => {};
  }, [handleFetchComments]);

  return (
    <main className="home">
      {!isLoading &&
        data.comments.map((el) => (
          <Comment comment={el} currentUser={data.currentUser} key={el.id} />
        ))}
      {!isLoading && error && <p>{error}</p>}
      {isLoading && <p>loading ...</p>}

      <AddComment type={"send"} />
    </main>
  );
};

export default Home;
