import { useState } from 'react'
import type { Question } from '../../../models/Questoin';

export default function useQuestoins(initialQuestions: Question[] = []) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    
  const addQuestion = () => {
    let numQ = questions.length + 1;
    setQuestions([...questions, { id: Date.now() , numQ: numQ}]);
  };

  const deleteQuestion = (id: number) => {
    setQuestions((prev) => {
      const filtered = prev.filter((el) => el.id !== id);

      const renumbered = filtered.map((el, index) => ({
        ...el,
        numQ: index + 1,
      }));

      return renumbered;
    });
  };

  return {deleteQuestion, addQuestion, questions, setQuestions}
}
