import { useCreateContext } from "../../../../create-context/CreateProvider";

import styles from "./ButtonType.module.css";

interface Props {
  title: string;
  questionType: string;
}

export default function ButtonType({ title, questionType }: Props) {
  const { createQuestion } = useCreateContext();

  const handleClick = async () => {
    await createQuestion(questionType);
  };

  return (
    <button className={styles.main} onClick={handleClick}>
      {title}
    </button>
  );
}
