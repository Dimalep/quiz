import { useEffect, useState } from "react";
import InputArea from "../InputArea";
import type { QuestionDto } from "../../../../../../core/models/QuestionDto";

interface Props{
  question: QuestionDto;
  onUpdate: (question: QuestionDto) => void;
}

export default function DefaultQuestionSlide({question, onUpdate} : Props) {
  const [title, setTitle] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");

  useEffect(() => {
    setTitle(question.title ?? "");
    setCorrectAnswer(question.correctAnswer ?? "");
    setAnswer1(question.answers?.[0] ?? "");
    setAnswer2(question.answers?.[1] ?? "");
    setAnswer3(question.answers?.[2] ?? "");
  }, [question]);

  const handleClickApply = () => {
    const answers = [answer1, answer2, answer3];
    question.title = title;
    question.correctAnswer = correctAnswer;
    question.answers = answers;

    onUpdate(question);
  }

  return (
    <div style={{display: "flex", flexDirection: "column", width: "100%", gap: 10}}>
        <InputArea width={100} height={50} backgroundColor="#6C63FF" title="Вопрос" isTitle={true} value={title} setValue={setTitle}/>
        <InputArea width={100} height={50} backgroundColor="#748795" title="Правильный ответ" isTitle={true} value={correctAnswer} setValue={setCorrectAnswer}/>
        <InputArea width={100} height={50} backgroundColor="#748795" title="Ложные ответы" isTitle={true} value={answer1} setValue={setAnswer1}/>
        <InputArea width={100} height={50} backgroundColor="#748795" title="Ответ" isTitle={false} value={answer2} setValue={setAnswer2}/>
        <InputArea width={100} height={50} backgroundColor="#748795" title="Ответ" isTitle={false} value={answer3} setValue={setAnswer3}/>
        <div style={{display: "flex", justifyContent: "end"}}>
          <button style={{width: 100, padding: 10}} onClick={handleClickApply}>Применить</button>
        </div>
    </div>
  )
}
