export type Quiz = {
    id: number;
    title: string;
    description: string;
    type: string;
    time: string;
}

export default function useQuizCreationService() {
  
  const getQuizById = async (quizId: number) : Promise<Quiz | undefined> =>  {
    const response = await fetch("", {
      method: "GET",
      headers: {"Content-type": "application/json"},
    });

    if(!response.ok){
      console.log("Error get quiz by id");
      return;
    }
  
    return undefined;
  }
  
  const addQuiz = async (quiz: Quiz) : Promise<Quiz | undefined> => {
    const response = await fetch("", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(quiz)
    });

    if(!response.ok){
      console.log("Error add quiz");
      return;
    }

    const data: Quiz = await response.json();

    return data;
  }

  return {getQuizById, addQuiz}
}
