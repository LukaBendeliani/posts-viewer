import { useState, useEffect, FC } from "react";

import PostCard from "./components/postCard/postCard";
import PostSection from "./components/postsSection/postSection";
import PostList from "./components/postList/postList";
import getData from "./utils/getData";

import { Post } from "./interfaces";

const App = () => {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    getData(setPosts, "http://localhost:3001/posts");
  }, []);

  const postsMapper: FC<Post> = (post: Post, index) => {
    const callback = () => setActivePost({ ...post });
    const cardProps = { ...post, callback };
    return <PostCard key={index} {...cardProps} />;
  };

  return (
    <div style={{ display: "flex" }}>
      {posts.length ? (
        <PostList>{posts.map(postsMapper)}</PostList>
      ) : (
        <h1>Loading...</h1>
      )}
      {activePost && (
        <PostSection {...activePost} posts={posts} setPosts={setPosts} />
      )}
    </div>
  );
};

export default App;
