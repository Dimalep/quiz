import { useCreateContext } from "../../../../create-context/CreateProvider";

import styles from "./ButtonType.module.css";

interface Props {
  title: string;
  questionType: string;
}

export default function ButtonType({ title, questionType }: Props) {
  const { dispatch } = useCreateContext();

  const handleClick = () => {
    dispatch({ type: "CREATE_QUESTION", payload: {type: questionType} });
  };

  return (
    <button className={styles.main} onClick={handleClick}>
      {title}
    </button>
  );
}
