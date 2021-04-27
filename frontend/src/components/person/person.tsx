import { FC } from "react";

import styles from "./person.module.css";

interface Props {
  image: string;
  name: string;
}

const Person: FC<Props> = ({ image, name }) => {
  return (
    <div className={styles.personContainer}>
      <img src={image} alt="profile" />
      <h6>{name}</h6>
    </div>
  );
};

export default Person;
