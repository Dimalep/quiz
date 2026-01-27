import { type CSSProperties } from "react";
import { useCreateContext } from "../../../../create-context/CreateProvider";

interface Props {
  title: string;
  questionType: number;
}

export default function ButtonType({ title, questionType }: Props) {
  const { startNewSlide } = useCreateContext();

  const handleClick = () => {
    startNewSlide(questionType);
  };

  return (
    <button style={styles.main} onClick={handleClick}>
      {title}
    </button>
  );
}

const styles = {
  main: { width: "400px", padding: "10px" } as CSSProperties,
};
