import { KeyboardEvent, FC, useState, useEffect } from "react";

import styles from "./postSection.module.css";
import { Post, Comment } from "../../interfaces";

import Person from "../person/person";
import updatePostsArray from "../../utils/updatePostsArray";

import CommentInput from "../commentInput/commentInput";
import CommentComponent from "../comment/comment";

const PostSection: FC<Post> = ({
  title,
  content,
  profile,
  name,
  comments,
  postId,
  posts,
  setPosts,
}) => {
  const [commentValue, setCommentValue] = useState("");
  const [replyValue, setReplyValue] = useState("");
  const [visibleReply, setVisibleReply] = useState<number | null>(null);

  const toggleVisibility = () => {
    return (index: number) =>
      setVisibleReply(index === visibleReply ? null : index);
  };

  useEffect(() => {
    setReplyValue("");
    setCommentValue("");
  }, [postId]);

  const postComment = ({
    key,
    currentTarget: { name, value },
  }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter" && value) {
      const user =
        localStorage.getItem("name") || prompt("Enter your name") || "guest";
      localStorage.setItem("name", user);

      const comment = {
        content: value,
        profile,
        postId,
        name: user,
        replys: [],
      };

      updatePostsArray(
        name,
        posts,
        postId,
        comment,
        visibleReply,
        setPosts
      ).then(() =>
        name === "COMMENT" ? setCommentValue("") : setReplyValue("")
      );
    }
  };

  const handleChange = (val: string) => {
    setCommentValue(val);
  };

  const commentsMapper = (
    { content, name, profile, replys }: Comment,
    index: number
  ) => {
    const commentComponentProps = {
      content,
      name,
      profile,
      index,
      visibleReply,
      replyValue,
      toggleVisibility,
      postComment,
      setReplyValue,
      replys,
    };
    return <CommentComponent key={index} {...commentComponentProps} />;
  };

  return (
    <div className={styles.container}>
      <Person name={name} image={profile} />
      <h3>{title}</h3>
      <p>{content}</p>
      <CommentInput
        name="COMMENT"
        keyPressCallback={(e) => postComment(e)}
        onChangeCallback={({ target: { value } }) => handleChange(value)}
        changeHandler={handleChange}
        value={commentValue}
        placeHolder="Write comment..."
      />
      {comments.map(commentsMapper)}
    </div>
  );
};

export default PostSection;
