import styles from "./ShortTextBox.module.css";

interface Props {
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  title: string;
  maxLength?: number;
}

export default function ShortTextBox({
  placeholder = "Введите текст...",
  value,
  setValue,
  onBlur,
  title,
  maxLength = 50,
}: Props) {
  const count = value.length;
  const isLimit = count >= maxLength;

  return (
    <div>
      <span className={styles.title}>{title}</span>
      <div className={styles.main}>
        <div className={styles.input}>
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            maxLength={maxLength}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
          />

          <div className={styles.controls}>
            {value && (
              <button type="button" onClick={() => setValue("")}>
                ×
              </button>
            )}
            <label>
              {count}/{maxLength}
            </label>
          </div>
        </div>
      </div>

      {isLimit && (
        <span className={styles.error_limit}>Превышен лимит символов</span>
      )}
    </div>
  );
}
