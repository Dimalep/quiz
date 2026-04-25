import { useRef } from "react";
import styles from "./AutoTextarea.module.css";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export default function AutoTextarea({ value, setValue }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  };

  return (
    <textarea
      ref={ref}
      onInput={resize}
      className={styles.textarea}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Введите текст..."
    />
  );
}
