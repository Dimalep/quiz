export type QuizSessionDTO = {
    id: number;
    key: string;
    quizId: number;
    createAt: Date;
    completeAt: Date;
}

export default function useQuizSession() {
  const addQuizSession = async (quizId: number) : Promise<QuizSessionDTO | undefined>=> {
    const response = await fetch(`http://localhost:5103/api/quiz-sessions/${quizId}`,{
        method: "POST",
        headers: {"Content-type": "application/json"}
    });

    if(!response.ok){
        console.log("Error add quiz session");
        return;
    }

    const data: QuizSessionDTO = await response.json();

    return data;
  };

  return {addQuizSession}
}