import { KeyboardEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./postSection.module.css";
import { Post, Comment } from "../../interfaces";
import { updatePostsState } from "../../redux/actions";
import { PostsState } from "../../redux/reducer";

const PostSection: FC<Post> = ({
  title,
  content,
  profile,
  name,
  comments,
  postId,
}) => {
  const [commentValue, setCommentValue] = useState("");
  const dispatch = useDispatch();

  const updatePosts = (posts: PostsState) => {
    dispatch(updatePostsState(posts));
  };

  const commentsMapper = (
    { content, name, profile }: Comment,
    index: number
  ) => {
    return (
      <div key={index} className={styles.comment}>
        <div className={styles.profile}>
          <img src={profile} alt="profile" />
          <h3>{name}</h3>
        </div>
        {content}
      </div>
    );
  };

  const postComment = ({ key }: KeyboardEvent) => {
    if (key === "Enter" && commentValue) {
      const name = localStorage.getItem("name");
      if (!name) {
        const name = prompt("Enter your name");
        localStorage.setItem("name", name ? name : "guest");
      }

      const data = {
        content: commentValue,
        profile,
        postId,
        name: name,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      };
      fetch("http://localhost:3001/comments", options)
        .then((res) => res.json())
        .then((json) => updatePosts(json));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <div className={styles.profile}>
          <img src={profile} alt="profile" />
          <h3>{name}</h3>
        </div>
        <h3>{title}</h3>
        <p>{content}</p>
        <input
          type="text"
          name="comment"
          placeholder="Write a Comment..."
          onKeyPress={postComment}
          onChange={({ target: { value } }) => setCommentValue(value)}
          value={commentValue}
        />
        {comments.map(commentsMapper)}
      </div>
    </div>
  );
};

export default PostSection;
