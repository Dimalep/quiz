import { type Dispatch, type SetStateAction } from "react";
import styles from "./InputFeild.module.css";

interface Props {
  inputSessionKey: string;
  setInputSessionKey: Dispatch<SetStateAction<string>>;
}

export default function InputField({
  setInputSessionKey,
  inputSessionKey,
}: Props) {
  return (
    <div className={styles.main}>
      <input
        className={styles.input}
        placeholder="Введи код"
        value={inputSessionKey}
        onChange={(e) => setInputSessionKey(e.target.value)}
      />
    </div>
  );
}
