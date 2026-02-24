export type QuizSession = {
    id: number;
    sessionKey: string;
    // quizId: number;
}

export default function useQuizSession() {

  const getQuizSessionBySessionKey = async (sessionKey: string) : Promise<QuizSession | undefined>=> {
    const response = await fetch(`http://localhost:5103/api/quiz-sessions/${sessionKey}`,{
        method: "GET",
        headers: {"Content-type": "application/json"}
    });

    if(!response.ok){
        console.log("Error get quiz session by session key");
        return;
    }

    const data: QuizSession = await response.json();

    return data;
  };

  const addQuizSession = async (quizId: number) : Promise<QuizSession | undefined>=> {
    const response = await fetch(`http://localhost:5103/api/quiz-sessions/${quizId}`,{
        method: "POST",
        headers: {"Content-type": "application/json"}
    });

    if(!response.ok){
        console.log("Error add quiz session");
        return;
    }

    const data: QuizSession = await response.json();
    return data;
  };

  const startQuizSession = async () => {
    //
  };

  return {addQuizSession, startQuizSession, getQuizSessionBySessionKey}
}