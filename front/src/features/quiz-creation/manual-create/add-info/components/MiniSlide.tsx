import { useState } from "react"
import type { Question } from "../../../../../core/models/Questoin";

interface Props {
  question: Question;
  setIsSelected: (id: number | undefined) => void; 
  isSelected: number | undefined;
  number: number
}

export default function MiniSlide({question, setIsSelected, isSelected, number} : Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div style={{
        padding: "20px 20px", 
        backgroundColor: "#1E1E2F", 
        backdropFilter: "blur(10px)", 
        borderRadius: 8, 
        color: "#999999ff",
        filter: isHover ? "brightness(1.2)" :  "brightness(1.0)",
        boxShadow: "inset 0 4px 12px rgba(0, 0, 0, 0.35)",
        border: isSelected == question.id ? "1px solid #6C63FF" : "none"
      }}
      onClick={() => setIsSelected(question.id)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      >{number === 0 ? "settings" : number}</div>
  )
}
