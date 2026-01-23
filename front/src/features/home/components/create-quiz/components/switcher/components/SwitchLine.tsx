import { useState, type CSSProperties } from "react";

interface Props {
  setType: (value: number) => void;
  type: number;
}

export default function SwitchLine({ setType, type }: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      style={styles.main(isHover)}
      onClick={() => (type > 0 ? setType(0) : setType(1))}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    ></div>
  );
}

const styles = {
  main: (isHover: boolean): CSSProperties => ({
    width: "50px",
    height: "30px",
    borderTop: isHover ? `4px solid red` : `4px solid black`,
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "none",
  }),
};
