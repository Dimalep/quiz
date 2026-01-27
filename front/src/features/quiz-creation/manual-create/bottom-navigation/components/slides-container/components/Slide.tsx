import type { CSSProperties } from "react";
import { useCreateContext } from "../../../../CreateProvider";

interface Props {
  number: number;
}

export default function Slide({ number }: Props) {
  const { openSlide } = useCreateContext();

  const handleClick = () => {
    openSlide(number);
  };

  return (
    <div onClick={handleClick} style={styles.main}>
      {number}
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px",
    backgroundColor: "rgb(15, 74, 114)",
    cursor: "pointer",
  } as CSSProperties,
};
