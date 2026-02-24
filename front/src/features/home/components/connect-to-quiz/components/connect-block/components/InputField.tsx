import { type CSSProperties, type Dispatch, type SetStateAction } from "react";

interface Props {
  inputSessionKey: string;
  setInputSessionKey: Dispatch<SetStateAction<string>>;
}

export default function InputField({
  setInputSessionKey,
  inputSessionKey,
}: Props) {
  return (
    <div style={styles.main}>
      <input
        style={styles.input}
        placeholder="Введи код"
        value={inputSessionKey}
        onChange={(e) => setInputSessionKey(e.target.value)}
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
