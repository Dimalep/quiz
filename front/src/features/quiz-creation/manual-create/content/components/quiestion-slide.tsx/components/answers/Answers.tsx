import { type CSSProperties } from "react";
import AnswerBlock from "./components/AnswerBlock";
import { useCreateContext } from "../../../../../create-context/CreateProvider";

export default function Answers() {
  const { currentSlide, addAnswer } = useCreateContext();

  const addAnswerHandleClick = () => {
    addAnswer();
  };

  return (
    <div style={styles.main}>
      <div style={styles.content}>
        {currentSlide?.question?.answers.map((el) => (
          <AnswerBlock key={el.number} answer={el} />
        ))}
        <button style={styles.buttonAdd} onClick={addAnswerHandleClick}>
          +
        </button>
      </div>
    </div>
  );
}

const styles = {
  main: { padding: "10px 20px" } as CSSProperties,
  content: {
    display: "flex",
    justifySelf: "stretch",
    //width: "500px",
    flexDirection: "column",
    border: "2px solid black",
    borderRadius: "13px",
    padding: "10px",
    gap: "10px",
  } as CSSProperties,
  buttonAdd: {
    display: "flex",
    width: "50px",
    alignSelf: "center",
    justifyContent: "center",
  } as CSSProperties,
};
