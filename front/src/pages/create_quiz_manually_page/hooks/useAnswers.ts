import { useState } from "react"
import type { Answer } from "../../../models/Answer"

export default function useAnswers(initialAnswers: Answer[] = []) {
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers)
  const [isCorrect, setIsCorrect] = useState(false);

  const addAnswer = () => {
    let numA = answers.length + 1;
    setAnswers([...answers, {id: Date.now(), numA: numA, isCorrect: false, value: ""}])
  }

  const deleteAnswer = (id: number) => {
    setAnswers((prev) => {
        const filtered = prev.filter(el => el.id !== id);

        const renumbered = filtered.map((el, index) => ({
            ...el,
            numA: index + 1
        }))

        return renumbered;
    })
  }

  const toggleCorrect = (id: number) => {
    setAnswers(prev =>
        prev.map(answer =>
        answer.id === id ? { ...answer, isCorrect: !answer.isCorrect } : answer
    )); 
  };

  return {answers, addAnswer, deleteAnswer, isCorrect, setIsCorrect, toggleCorrect}
}
