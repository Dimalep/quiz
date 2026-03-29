import { useRef } from "react";
import styles from "./AutoTextArea.module.css";

interface Props {
  borderColor?: string;
  value: string;
  setValue: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export default function AutoTextArea({
  borderColor,
  value,
  setValue,
  onBlur,
}: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };
  return (
    <div className={styles.main}>
      <textarea
        ref={ref}
        className={styles.input}
        placeholder="Введите вопрос..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        onInput={handleInput}
      />
      {value.length > 0 && (
        <button className={styles.remove_btn} onClick={() => setValue("")}>
          x
        </button>
      )}
    </div>
  );
}
