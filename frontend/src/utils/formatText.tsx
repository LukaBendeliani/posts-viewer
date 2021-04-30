const formatText = (str: string) => {
  let tempArr = str.split(" ");

  return (
    <p>
      {tempArr.map((word, index) => {
        if (word.startsWith("#")) {
          return (
            <button
              style={{
                color: "#0645AD",
                background: "none",
                border: "none",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              {word}
            </button>
          );
        } else {
          return " " + word;
        }
      })}
    </p>
  );
};

export default formatText;
