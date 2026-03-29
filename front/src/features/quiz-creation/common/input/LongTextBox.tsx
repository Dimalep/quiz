import styles from "./LongTextBox.module.css";

interface Props {
  title?: string;
  value: string;
  maxLength?: number;
  placeholder?: string;
  setValue: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export default function LongTextBox({
  title,
  value,
  maxLength = 150,
  placeholder,
  setValue,
  onBlur,
}: Props) {
  const count = value.length;
  const isLimit = count >= maxLength;

  return (
    <div>
      <span className={styles.title}>{title}</span>
      <div className={styles.main}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          onBlur={onBlur}
          maxLength={maxLength}
          rows={5}
        />
        <div className={styles.controls}>
          {value && <button onClick={() => setValue("")}>x</button>}
          <label>
            {count}/{maxLength}
          </label>
        </div>
      </div>
      {isLimit && (
        <span className={styles.error_limit}>Превышен лимит символов</span>
      )}
    </div>
  );
}
