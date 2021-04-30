import { KeyboardEvent } from "react";

const suggestText = (
  e: KeyboardEvent<HTMLInputElement>,
  names: Array<string>,
  suggestion: string,
  setSuggestion: (str: string) => void,
  changeHandler: (val: string) => void
) => {
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

export default suggestText;
