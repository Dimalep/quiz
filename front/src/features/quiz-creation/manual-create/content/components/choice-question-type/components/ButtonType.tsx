import React, { type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  questionType: number;
}

export default function ButtonType({ title, questionType }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("");
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
