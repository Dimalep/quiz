import { useState } from 'react'
import type { Question } from '../models/Questoin';
import type { QuestionDto } from '../dto/QuestionsDto';

export default function useQuestoins(initialQuestions: Question[] = []) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    
  const addQuestion = async (quizId: number) => {
    let numQ = questions.length + 1;
    const newQuestion = { tmpid: Date.now(), numQ, value: "while empty", quizId: quizId};
    setQuestions((prev) => [...prev, newQuestion]);

  };

  const editQuestion = async (updatedQuestion: Question) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.tmpid === updatedQuestion.tmpid ? updatedQuestion : q
      )
    );
  };

  const deleteQuestion = (tmpid: number) => {
    setQuestions((prev) => {
      const filtered = prev.filter((el) => el.tmpid !== tmpid);

      const renumbered = filtered.map((el, index) => ({
        ...el,
        numQ: index + 1,
      }));

      return renumbered;
    });
  };

  const completeAddingQuestions = async () => {
    if(questions.length === 0) return

     const dtoArray: QuestionDto[] = questions.map((q) => ({
      value: q.value,
      description: q.description ?? "",
      time: q.time ?? new Date(),
      quizId: {"id": q.quizId} 
    }));

    try{
      await fetch("http://localhost:8089/api/questions/create-bulk", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(dtoArray),
      })
    } catch(error){
      console.error("Error adding array with questions: ", error);
    }
  }

  return {deleteQuestion, addQuestion, questions, setQuestions, editQuestion, completeAddingQuestions}
}
