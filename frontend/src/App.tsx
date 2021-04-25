import React, { useState, useEffect } from "react";

import Card from "./components/card/card";
import PostSection from "./components/postsSection/postSection";

import styles from "./App.module.css";
export interface Post {
  name: string;
  title: string;
  content: string;
  comments: object[];
  callback: React.MouseEventHandler;
}

const App = () => {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("http://localhost:3001/posts");
    const json = await response.json();
    setPosts(json);
  };

  const postsMapper: React.FC<Post> = (
    { name, title, content, comments },
    index
  ) => {
    const cardProps = {
      title,
      content,
      callback: () => setActivePost({ name, title, content, comments }),
    };
    return <Card key={index} {...cardProps} />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.postList}>{posts.map(postsMapper)}</div>
      <PostSection></PostSection>
    </div>
  );
};

export default App;
