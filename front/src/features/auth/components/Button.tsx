import { useState, type CSSProperties } from "react";

interface Props {
  handleClickLogin: (e: React.FormEvent) => Promise<void>;
  authMode: string;
}

export default function Button({ authMode, handleClickLogin }: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      onClick={handleClickLogin}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={styles.button(isHover)}
    >
      {authMode === "login"
        ? "Войти"
        : authMode === "registrate"
        ? "Создать"
        : "Восстановить"}
    </button>
  );
}

const styles = {
  button: (isHover: boolean) =>
    ({
      boxShadow: "0 4px 10px rgba(0,0,0, 0.1)",
      height: "50px",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: isHover ? "#2e23cc" : "#3D2AFF",
      border: "3px solid black",
      fontSize: 16,
      fontFamily: "Rubik",
      transition: "all 0.2s ease-in-out",
      transform: isHover ? "scale(1.02)" : "scale(1)",
    } as CSSProperties),
};
