import styles from "./AuthButton.module.css";

interface Props {
  children: React.ReactNode;
}

export default function AuthButton({ children }: Props) {
  return (
    <button type="submit" className={styles.main}>
      {children}
    </button>
  );
}
