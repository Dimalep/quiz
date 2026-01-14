import { useState, type CSSProperties } from "react";

interface Props {
  title: string;
}

export default function Buttons({ title }: Props) {
  const [isHover, setIsHover] = useState(false);
  return (
    <span
      style={styles.button(isHover)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {title}
    </span>
  );
}

const styles = {
  button: (isHover: boolean) =>
    ({
      color: isHover ? "blue" : "black",
      cursor: "pointer",
    } as CSSProperties),
};
