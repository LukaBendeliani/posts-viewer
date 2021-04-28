import { KeyboardEvent } from "react";

import styles from "./comment.module.css";
import Person from "../person/person";
import CommentInput from "../commentInput/commentInput";
import { Comment } from "../../interfaces";

interface Props extends Comment {
  index: number;
  visibleReply: number | null;
  replyValue: string;
  toggleVisibility: () => (index: number) => void;
  postComment: (e: KeyboardEvent<HTMLInputElement>) => void;
  setReplyValue: (replyValue: string) => void;
}

const CommentComponent = (params: Props) => {
  const {
    name,
    profile,
    content,
    replys,
    toggleVisibility,
    index,
    visibleReply,
    postComment,
    setReplyValue,
    replyValue,
  } = params;

  const handleChange = (val: string) => {
    setReplyValue(val);
  };

  const replysMapper = ({ name, content, profile }: Comment, index: number) => {
    return (
      <div className={styles.reply} key={index}>
        <Person name={name} image={profile} />
        <p>{content}</p>
      </div>
    );
  };

  return (
    <div className={styles.comment}>
      <div className={styles.personContainer}>
        <Person name={name} image={profile} />
        <div
          className={styles.replyBtn}
          onClick={() => toggleVisibility()(index)}
        >
          Reply
        </div>
      </div>
      <p>{content}</p>
      {visibleReply === index && (
        <CommentInput
          name="REPLY"
          keyPressCallback={(e) => postComment(e)}
          onChangeCallback={({ target: { value } }) => handleChange(value)}
          changeHandler={handleChange}
          value={replyValue}
          placeHolder="Reply..."
        />
      )}
      <div className={styles.replys}>{replys.map(replysMapper)}</div>
    </div>
  );
};

export default CommentComponent;
