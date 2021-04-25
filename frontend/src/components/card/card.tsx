import * as React from "react";
import styles from "./card.module.css";

export interface Props {
  title: string;
  content: string;
  callback: React.MouseEventHandler;
}

const Card: React.FC<Props> = ({ title, content, callback }) => {
  return (
    <div className={styles.container} onClick={callback}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Card;
