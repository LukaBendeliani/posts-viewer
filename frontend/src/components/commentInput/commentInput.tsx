import {
  ChangeEventHandler,
  FC,
  KeyboardEvent,
  KeyboardEventHandler,
  useState,
  useEffect,
} from "react";

import styles from "./commentInput.module.css";
import getData from "../../utils/getData";

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

  const onKeyUpCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    const commands = val.split("#");
    const currentCommand = commands[commands.length - 1];

    const suggestedText = names.find((name) => {
      return name.startsWith(currentCommand);
    });

    const complete = suggestedText
      ? val + suggestedText.replace(currentCommand, "")
      : val;

    if (commands.length > 1 && suggestedText) {
      setSuggestion(val + suggestedText.replace(currentCommand, ""));
    } else {
      setSuggestion("");
    }

    if (e.key === "ArrowRight" && suggestion) {
      changeHandler(complete);
      setSuggestion(val);
    }
  };

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
        onKeyUp={onKeyUpCallback}
        className={inputClassName || styles.input}
        style={inputStyle}
        value={value}
      />
    </div>
  );
};

export default CommentInput;
