import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  useState,
  useEffect,
} from "react";

import styles from "./commentInput.module.css";
import getData from "../../utils/getData";
import suggestText from "../../utils/suggestion";

interface Props {
  keyPressCallback?: KeyboardEventHandler<HTMLInputElement>;
  onChangeCallback: ChangeEventHandler<HTMLInputElement>;
  changeHandler: (val: string) => void;
  value?: string;
  wrapperClassName?: string;
  wrapperStyle?: object;
  inputClassName?: string;
  inputStyle?: object;
  placeHolder: string;
  name: string;
}

const CommentInput: FC<Props> = ({
  keyPressCallback,
  onChangeCallback,
  changeHandler,
  value,
  wrapperClassName,
  inputClassName,
  inputStyle,
  placeHolder,
  name,
}) => {
  const [suggestion, setSuggestion] = useState("");
  const [names, setNames] = useState<Array<string>>([]);

  useEffect(() => {
    getData(setNames, "http://localhost:3001/users");
  }, []);

  return (
    <div className={wrapperClassName} style={{ position: "relative" }}>
      <input
        className={styles.complete}
        value={suggestion}
        type="text"
        readOnly
      />
      <input
        type="text"
        name={name}
        placeholder={placeHolder}
        onChange={onChangeCallback}
        onKeyPress={keyPressCallback}
        onKeyUp={(e) =>
          suggestText(e, names, suggestion, setSuggestion, changeHandler)
        }
        className={inputClassName || styles.input}
        style={inputStyle}
        value={value}
      />
    </div>
  );
};

export default CommentInput;
