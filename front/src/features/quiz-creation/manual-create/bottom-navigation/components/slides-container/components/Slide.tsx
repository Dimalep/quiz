import type { CSSProperties } from "react";
import { useCreateContext } from "../../../../create-context/CreateProvider";

interface Props {
  number: number;
}

export default function Slide({ number }: Props) {
  const { openSlide, currentSlide } = useCreateContext();

  const handleClick = () => {
    openSlide(number);
  };

  return (
    <div
      onClick={handleClick}
      style={styles.main(currentSlide?.number, number)}
    >
      {number}
    </div>
  );
}

const styles = {
  main: (curSlideNumber: number | undefined, number: number) =>
    ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "50px",
      height: "50px",
      backgroundColor: "rgb(15, 74, 114)",
      cursor: "pointer",
      border: curSlideNumber === number ? "1px solid red" : "none",
    }) as CSSProperties,
};
