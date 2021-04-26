import { useState, useEffect, FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostCard from "./components/postCard/postCard";
import PostSection from "./components/postsSection/postSection";

import styles from "./App.module.css";
import { Post } from "./interfaces";
import { PostsState } from "./redux/reducer";
import { updatePostsState } from "./redux/actions";

const App = () => {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const postsArray = useSelector<PostsState, PostsState["posts"]>(
    (state) => state.posts
  );

  const dispatch = useDispatch();

  const updatePosts = useCallback(
    (posts: PostsState) => {
      dispatch(updatePostsState(posts));
    },
    [dispatch]
  );

  const getData = useCallback(async () => {
    const response = await fetch("http://localhost:3001/posts");
    const json = await response.json();
    updatePosts(json);
  }, [updatePosts]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    setActivePost(activePost ? postsArray[activePost.postId] : null);
  }, [postsArray, activePost]);

  const postsMapper: FC<Post> = (post: Post, index) => {
    const callback = () => setActivePost({ ...post });
    const cardProps = { ...post, callback };
    return <PostCard key={index} {...cardProps} />;
  };

  return (
    <div className={styles.container}>
      {postsArray.length ? (
        <div className={styles.postList}>{postsArray.map(postsMapper)}</div>
      ) : (
        <h1>Loading...</h1>
      )}
      {activePost && <PostSection {...activePost} />}
    </div>
  );
};

export default App;
