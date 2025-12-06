import { useEffect, useState } from "react";
import type { QuizDto } from "../../../../../../core/models/QuizDto";
import InputArea from "../InputArea";

interface Props{
    quiz: QuizDto;
}

export default function SettingsSlide({quiz} : Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  useEffect(()=>{
    setTitle(quiz.title ?? "");
    setDescription(quiz.description ?? "");
    setTag(quiz.tag ?? "");
  },[quiz])

  const handleClickApply = () => {
    quiz.title = title;
    quiz.description = description;
    quiz.tag = tag;
  };

  return (
    <div style={{display: "flex", flexDirection: "column", width: "100%", gap: 10}}>
        <InputArea width={100} height={50} backgroundColor="#6C63FF" title="Название квиза" isTitle={true} value={title} setValue={setTitle}/>
        <InputArea width={100} height={100} backgroundColor="#748795" title="Описание квиза" isTitle={true} value={description} setValue={setDescription}/>
        <InputArea width={100} height={50} backgroundColor="#748795" title="Тег" isTitle={true} value={tag} setValue={setTag}/>
        <div>
          <button onClick={handleClickApply}>Применить</button>
        </div>
    </div>
  )
}
