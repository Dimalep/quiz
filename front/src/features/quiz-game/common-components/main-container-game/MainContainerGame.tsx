import { useState } from "react";
import styles from "./MainContainerGame.module.css";

type Props = {
  title: string;
  isTitle?: boolean;
  children: React.ReactNode;
  mainMarginTop?: number;
  mainMarginBottom?: number;
  defualtContent?: boolean;
};

export default function MainContainerGame({
  title,
  children,
  isTitle = true,
  mainMarginTop = 10,
  mainMarginBottom = 10,
  defualtContent = true,
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={styles.main}
      style={{ marginTop: mainMarginTop, marginBottom: mainMarginBottom }}
    >
      {isTitle && (
        <div
          className={styles.title}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <h3>{title}</h3>
          <h3>{isOpen ? "⏶" : "⏷"}</h3>
        </div>
      )}
      {isOpen && (
        <div className={defualtContent ? styles.content : ""}>{children}</div>
      )}
    </div>
  );
}
