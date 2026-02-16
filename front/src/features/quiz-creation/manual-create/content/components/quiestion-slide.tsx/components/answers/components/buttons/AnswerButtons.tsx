import styles from "./AnswerButtons.module.css";
import type { Answer } from "../../../../../../../create-context/reducer";
import AnswerButton from "./components/AnswerButton";

interface Props {
  answers: Answer[];
}

export default function AnswerBlock({ answers }: Props) {
  // const [inputAnswer, setInputAnswer] = useState(answer.text);
  //const { dispatch } = useCreateContext();

  // useEffect(() => {
  //   setInputAnswer(answer.text);
  // }, [answer.text]);

  // const removeHandleClick = () => {
  //   dispatch({ type: "DELETE_ANSWER", payload: { id: answer.id } });
  // };

  // const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setInputAnswer(value);

  //   dispatch({
  //     type: "UPDATE_ANSWER",
  //     payload: {
  //       answerId: answer.id,
  //       data: { text: value },
  //     },
  //   });
  // };

  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch({
  //     type: "UPDATE_ANSWER",
  //     payload: {
  //       answerId: answer.id,
  //       data: { isCorrectly: e.target.checked },
  //     },
  //   });
  // };

  const correctAnswers = answers.filter((a) => a.isCorrectly);
  const incorrectAnswers = answers.filter((a) => !a.isCorrectly);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        {correctAnswers.length > 0 && (
          <>
            <span>Правильный ответ</span>
            <div className={styles.correct_block}>
              {correctAnswers.map((el) => (
                <AnswerButton key={el.id} answer={el} isCorrectly={true} />
              ))}
            </div>
          </>
        )}
        <span>Неправильные ответы</span>
        <div className={styles.incorrect_block}>
          {incorrectAnswers.map((el) => (
            <AnswerButton key={el.id} answer={el} isCorrectly={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
