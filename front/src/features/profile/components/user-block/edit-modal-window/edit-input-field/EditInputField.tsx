import styles from "./EditInputField.module.css";

interface Props {
  title: string;
  value: string;
  onChange: (value: string) => void;
  isReadonly?: boolean;
}

export default function EditInputField({
  title,
  value,
  onChange,
  isReadonly = false,
}: Props) {
  const placeholder = title === "Пароль" ? "Новый пароль" : "Пусто";

  const info = title === "Пароль";

  return (
    <div className={styles.main}>
      <label>{title}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={isReadonly}
      />
      {info && (
        <span>
          Пароль скрыт в целях безопасности. Введите новый, если хотите его
          изменить.
        </span>
      )}
    </div>
  );
}
