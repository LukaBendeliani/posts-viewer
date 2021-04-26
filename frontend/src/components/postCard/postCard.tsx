import React from "react";
import styles from "./postCard.module.css";
import { Post } from "../../interfaces";

export interface Props extends Post {
  callback: React.MouseEventHandler;
}

const PostCard: React.FC<Props> = ({
  name,
  profile,
  title,
  content,
  callback,
}) => {
  return (
    <div className={styles.container} onClick={callback}>
      <div>
        <img src={profile} alt="profile" />
        <h6>{name}</h6>
      </div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default PostCard;
