import { useState, type CSSProperties } from "react";

export default function InputField() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div style={styles.main}>
      <input
        style={styles.input}
        placeholder="Введи код"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}

const styles = {
  main: {
    width: "60%",
    padding: "20px 0px 20px 0px",
    display: "flex",
    alignItems: "stretch",
  } as CSSProperties,
  input: {
    justifyContent: "center",
    width: "100%",
    fontSize: "24px",
  } as CSSProperties,
};
