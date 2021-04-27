import { MouseEventHandler, FC } from "react";

import styles from "./postCard.module.css";
import Person from "../person/person";
import { Post } from "../../interfaces";

interface Props extends Post {
  callback: MouseEventHandler;
}

const PostCard: FC<Props> = ({ name, profile, title, content, callback }) => {
  const personProps = { name, image: profile };

  return (
    <div className={styles.container} onClick={callback}>
      <Person {...personProps} />
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default PostCard;
