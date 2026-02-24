import type { CSSProperties } from "react";

interface Props {
  connectToQuizHanlder: () => void;
}

export default function ButtonToConnect({ connectToQuizHanlder }: Props) {
  return (
    <div style={styles.main}>
      <button style={styles.button} onClick={connectToQuizHanlder}>
        присоединиться
      </button>
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    alignItems: "center",
    //padding: "20px 0px 20px 0px",
  } as CSSProperties,
  button: {
    fontSize: "20px",
    padding: "10px",
  } as CSSProperties,
};
