import { FC, ReactNode } from "react";
import styles from "./postList.module.css";
interface Props {
  children?: ReactNode;
  className?: string;
}

const PostList: FC<Props> = ({ children, className }) => {
  return <div className={className || styles.postList}>{children}</div>;
};

export default PostList;
